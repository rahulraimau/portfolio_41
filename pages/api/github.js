
export default async function handler(req, res) {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return res.status(500).json({ error: "GitHub token not found in environment variables." });
  }

  try {
    const response = await fetch('https://api.github.com/users/rahulraimau/repos', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json'
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
