import csv from 'fast-csv'
import fs from 'fs'

export const uploadCSV = async (request, response) => {

    const { eventid, overwrite } = request.query
    console.log("🚀 ~ uploadCSV ~ eventid:", eventid)
    console.log("🚀 ~ uploadCSV ~ overwrite:", overwrite)
    
    if (!request.file) {
        return response.status(400).json({ error: 'Participants to upload missing missing' })
    }

    const filePath = request.file.path
    const fileRows = [];

    csv.parseFile(filePath, { headers: true })
        .on('data', (row) => {
            fileRows.push(row);
        })
        .on('end', () => {
            fs.unlinkSync(filePath); // Clean up temp file
            console.log('Parsed CSV 19:', fileRows.length);
            //   res.json({ success: true, data: fileRows });
        })
        .on('error', (error) => {
            console.error('CSV parse error:', error);
            //   res.status(500).json({ success: false, error: error.message });
        });

    response.status(200).send()
}