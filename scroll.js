async function fetchTextFile() {
    try {
        const response = await fetch('Info.txt');
        if (!response.ok) throw new Error('File not found or an error occurred');
        const text = await response.text();
        document.getElementById("mar").innerText = text;
    } catch (error) {
        console.error("Error fetching the text file:", error);
        document.getElementById("mar").innerText = "Error loading file content.";
    }
}
fetchTextFile();