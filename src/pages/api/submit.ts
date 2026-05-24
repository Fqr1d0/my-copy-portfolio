import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const data = await request.formData();
    
    // Extract form fields
    const name = data.get('name')?.toString() || '';
    const email = data.get('email')?.toString() || '';
    const topic = data.get('topic')?.toString() || '';
    const timeline = data.get('timeline')?.toString() || '';
    const scope = data.get('scope')?.toString() || '';
    
    // Construct Airtable Payload
    const payload = {
      records: [
        {
          fields: {
            "Full Name": name,
            "Email Address": email,
            "Topic / Industry": topic,
            "Timeline / Duration": timeline,
            "Project Scope & Brief": scope,
            "Attach a file (PDF or Image) (Optional)": ""
          }
        }
      ]
    };

    const baseId = import.meta.env.AIRTABLE_BASE_ID;
    const tableId = import.meta.env.AIRTABLE_TABLE_ID || 'may-to-june';
    const token = import.meta.env.AIRTABLE_TOKEN;

    if (!baseId || !token) {
      console.error("Missing Airtable configuration in .env");
      return redirect('/?error=missing_config');
    }

    const url = `https://api.airtable.com/v0/${baseId}/${tableId}`;
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Airtable Error:', errorText);
      return redirect('/?error=true');
    }

    return redirect('/?success=true');
  } catch (error) {
    console.error('Submission Error:', error);
    return redirect('/?error=true');
  }
}
