async function test() {
  const token = process.env.AIRTABLE_TOKEN || "REMOVED_SECRET";
  const baseId = "app2QITjC2FhgIVa6";
  const url = `https://api.airtable.com/v0/${baseId}/may-to-june`;
  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  try {
    const res = await (typeof fetch !== 'undefined' ? fetch : globalThis.fetch)(url, options);
    const json = await res.json();
    console.log("STATUS:", res.status);
    console.log("RESPONSE:", JSON.stringify(json));
  } catch(e) {
    console.error(e);
  }
}
test();
