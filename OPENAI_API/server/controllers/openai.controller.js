const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});



module.exports={
    

    openAiIdCard: async (req, res) => {
        try {
            const { name, surname, id, arabicText } = req.body;
    
            if (!name || !surname || !id || !arabicText) {
                return res.status(400).json({ error: 'All fields (name, surname, id, scriptOutput) are required.' });
            }
    
            console.log("🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️" + arabicText);
    
            try {
                const completion =  await openai.chat.completions.create({
                    model: 'gpt-4-1106-preview',
                    messages: [
                        {
                            role: 'system',
                            content: `You are a document comparator. 
                            Compare the provided data (name, surname, id) with the arabicText and return the result in JSON format.
                            The arabicText is obtained from an OCR process that may have inaccuracies.
                            The JSON should include:
                            1. "name_match": a boolean indicating if the name matches.
                            2. "surname_match": a boolean indicating if the surname matches.
                            3. "id_match": a boolean indicating if the id matches.
                            4. "accuracy": a percentage representing the overall accuracy of the comparison, considering potential OCR errors.
                            5. "notes": additional notes about the comparison and any potential ambiguities.`
                        },
                        {
                            role: 'user',
                            content: JSON.stringify({ name, surname, id, arabicText }),
                        },
                    ],
                });
    
                const response = completion.choices[0].message.content;
                console.log(response);
    
                res.json({ response });
            } catch (error) {
                console.error('Error with OpenAI API:', error);
                res.status(500).json({ error: 'Error processing request with OpenAI' });
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            res.status(500).json({ error: 'Unexpected server error' });
        }
    }





}