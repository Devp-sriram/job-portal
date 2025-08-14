export default async function getJob(url) {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw new Error('Failed to fetch data');
    // console.log(res)
    const data = await res.json();
    // console.log(data)
    return data;
  } catch (err) {
    console.error(err);
    return { success: false, error: err };
  }
}
