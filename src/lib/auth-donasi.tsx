export async function DonateIndividuDisaster() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/product/get-individu-disaster`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
    
        return data;
    } catch (error) {
        throw new Error('Data tidak ada');
    }
}

export async function DonateIndividuChildren() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/product/get-individu-children`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
    
        return data;
    } catch (error) {
        throw new Error('Data tidak ada');
    }
}   

export async function DonateIndividuEmpowerment() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/product/get-individu-empowerment`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
    
        return data;
    } catch (error) {
        throw new Error('Data tidak ada');
    }
}

export async function DonateIndividuInfrastructure() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/product/get-individu-infrastructure`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
    
        return data;
    } catch (error) {
        throw new Error('Data tidak ada');
    }
}