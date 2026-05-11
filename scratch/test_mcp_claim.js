const token = 'e4b649b1a606137102298d589546ef9c3bab1daed5df032a71cffaf0e5e43fc1';
const orderNumber = 'ORD-5UQ52UMF1F'; // Ganti jika perlu

async function testSubmitClaim() {
    console.log('--- Memulai Test Submit Claim ke MCP Server ---');
    
    const payload = {
        order_number: orderNumber,
        reason: 'Barang pecah saat diterima. Analisis AI menunjukkan retakan pada sisi kiri.',
        type: 'claim',
        status: 'pending'
    };

    try {
        const response = await fetch('http://127.0.0.1:8001/api/mcp/claims', {
            method: 'POST',
            headers: {
                'X-MCP-Token': token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok) {
            console.log('✅ BERHASIL: Klaim tercatat!');
            console.log('Response:', JSON.stringify(result, null, 2));
        } else {
            console.log('❌ GAGAL:', response.status);
            console.log('Error:', JSON.stringify(result, null, 2));
        }
    } catch (error) {
        console.error('💥 ERROR KONEKSI:', error.message);
        console.log('\nTips: Pastikan server Laravel berjalan di http://127.0.0.1:8001');
    }
}

testSubmitClaim();
