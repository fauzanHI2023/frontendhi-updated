interface FormDataPersonal {
    user_name: string;
    full_name: string;
    email: string;
    passwd: string;
  }
  
  interface FormDataCompany {
    user_name: string;
    full_name: string;
    email: string;
    passwd: string;
    // Tambahkan field lain jika diperlukan
  }
  
  export async function registerPersonal(formData: FormDataPersonal): Promise<any> {
    try {
      const response = await fetch('https://adminx.human-initiative.org/register-personal/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to register personal');
    }
  }
  
  export async function registerCompany(formData: FormDataCompany): Promise<any> {
    try {
      const response = await fetch('https://adminx.human-initiative.org/register-company/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to register company');
    }
  }
  