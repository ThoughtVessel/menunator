import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const ai = new GoogleGenAI({ apiKey: 'AIzaSyA43G88T510QYfSw_lpkL5FDuaRC7ZIjwk' });

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image') as File;

    if (!imageFile) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Convert image to base64
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    // Step 1: Validate if this is actually a menu
    const validationPrompt = `
      Look at this image carefully. Is this a restaurant menu, food menu, or similar document that lists food/drink items with names and potentially prices?

      Respond with ONLY one word:
      - "YES" if this is clearly a menu (restaurant menu, cafe menu, food menu, drink menu, etc.)
      - "NO" if this is not a menu (random photo, document, receipt, person, landscape, etc.)

      Only respond with YES or NO, nothing else.
    `;

    const validationResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: validationPrompt },
            {
              inlineData: {
                data: base64Image,
                mimeType: imageFile.type,
              },
            },
          ],
        },
      ],
    });

    const validationText = (validationResponse.text || '').trim().toUpperCase();

    if (validationText !== 'YES') {
      return NextResponse.json(
        { error: 'The uploaded image does not appear to be a menu. Please upload a clear image of a restaurant menu.' },
        { status: 400 }
      );
    }

    // Step 2: Detailed menu analysis
    const analysisPrompt = `
      This is confirmed to be a menu. Now perform a detailed analysis and extract ALL visible menu items.

      INSTRUCTIONS:
      1. Carefully read every menu item visible in the image
      2. Extract the exact item names as written
      3. If descriptions are provided, use them; if not, create appealing 1-2 sentence descriptions
      4. Extract exact prices if visible; if not visible, estimate reasonable prices for the type of establishment
      5. Analyze ingredients/descriptions to determine diet information (vegetarian, vegan, gluten-free, dairy-free, high protein, low carb, keto-friendly, etc.)
      6. Include ALL items you can see, not just a few examples

      CRITICAL: Respond with ONLY a valid JSON array of menu items in this exact format:
      [
        {
          "name": "Exact Item Name",
          "description": "Appetizing description based on menu or inferred from name",
          "price": "$XX.XX",
          "dietInfo": ["Vegetarian", "Gluten-Free", etc.]
        }
      ]

      Do not include any text before or after the JSON array. No explanations, no markdown formatting, just the raw JSON array.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: analysisPrompt },
            {
              inlineData: {
                data: base64Image,
                mimeType: imageFile.type,
              },
            },
          ],
        },
      ],
    });

    const text = response.text || '';

    // Parse the JSON response
    let menuItems;
    try {
      // Clean up the response text to extract JSON
      const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
      menuItems = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      console.log('Raw response:', text);

      // Fallback to mock data if parsing fails
      menuItems = [
        {
          name: "Menu Item 1",
          description: "AI analysis is processing your menu",
          price: "$12.99",
          dietInfo: ["Analysis in progress"]
        }
      ];
    }

    // Step 3: Generate custom images for each menu item
    const itemsWithImages = await Promise.all(
      menuItems.map(async (item: {
        name: string;
        description: string;
        price: string;
        dietInfo: string[];
      }) => {
        try {
          // Generate image using Google's Imagen 4.0 Fast model
          const imagePrompt = `A high-quality, appetizing photograph of "${item.name}". ${item.description}. Professional food photography with excellent lighting, beautiful plating, restaurant-quality presentation. Make it look delicious and visually appealing.`;

          const imageResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: [
              {
                role: 'user',
                parts: [{ text: imagePrompt }],
              },
            ],
          });

          // Extract the generated image from the response
          console.log('Image generation response for', item.name);

          let imageUrl = null;
          if (imageResponse.candidates && imageResponse.candidates[0]) {
            const candidate = imageResponse.candidates[0];
            if (candidate.content && candidate.content.parts) {
              for (const part of candidate.content.parts) {
                if (part.inlineData && part.inlineData.data) {
                  // Convert base64 to data URL
                  imageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
                  break;
                }
              }
            }
          }

          return {
            ...item,
            imageUrl: imageUrl || null, // null if no image was generated
            isGenerated: !!imageUrl
          };
        } catch (imageError) {
          console.error(`Error generating image for ${item.name}:`, imageError);

          return {
            ...item,
            imageUrl: null, // No fallback images
            isGenerated: false
          };
        }
      })
    );

    return NextResponse.json({ menuItems: itemsWithImages });

  } catch (error) {
    console.error('Error analyzing menu:', error);
    return NextResponse.json(
      { error: 'Failed to analyze menu' },
      { status: 500 }
    );
  }
}