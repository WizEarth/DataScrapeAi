const axios = require("axios");

async function savedown(videoUrl) {
    try {
        
        const apiUrl = "https://api.v02.savethevideo.com/tasks";
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, seperti Gecko) Chrome/134.0.0.0 Mobile Safari/537.36",
            "Referer": `https://www.savethevideo.com/de/home?url=${encodeURIComponent(videoUrl)}`
        };

        const data = { type: "info", url: videoUrl };
        const response = await axios.post(apiUrl, data, { headers });

        if (response.data?.result?.length > 0) {
            const videoData = response.data.result[0];

            const videoFormats = videoData.formats.map(f => ({
                format: f.format,
                quality: f.height ? `${f.height}p` : "Unknown",
                size: f.filesize_human || null,
                extension: f.ext,
                cdn_url: f.url
            }));

            return {
                title: videoData.title,
                uploader: videoData.uploader,
                upload_date: videoData.upload_date,
                views: videoData.view_count,
                duration: videoData.duration_string,
                thumbnail: videoData.thumbnail,
                cdn_links: videoFormats
            };
        }

        return { error: "⚠️ Video tidak ditemukan atau format tidak tersedia." };

    } catch (error) {
        return { error: error.message || "Terjadi kesalahan saat memproses video." };
    }
}
//EXAMPLE - YOU CAN EDIT THIS
savedown('https://youtube.com/watch?v=pP29u286Yo4');
