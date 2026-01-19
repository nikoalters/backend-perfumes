export const emailOrdenRecibida = (nombre, orderId, total, items) => {
  
    // Crea la lista de productos
    const itemsHtml = items.map(item => `
      <div style="border-bottom: 1px solid #333; padding: 10px 0; display: flex; justify-content: space-between; color: #ccc; font-size: 14px;">
         <span>${item.nombre || item.name} (x${item.qty})</span>
         <span style="color: #fff;">$${item.price.toLocaleString('es-CL')}</span>
      </div>
    `).join('');
  
    return `
    <div style="background-color: #050505; font-family: 'Helvetica', 'Arial', sans-serif; padding: 40px 20px; color: #ffffff; max-width: 600px; margin: auto; border-radius: 10px;">
      
      <div style="text-align: center; margin-bottom: 30px;">
        <h2 style="letter-spacing: 3px; text-transform: uppercase; margin: 0; font-size: 20px;">Perfumes <span style="color: #009970;">Chile</span></h2>
      </div>
  
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-size: 24px; margin-bottom: 10px; color: #fff;">¡Orden Recibida! 🔒</h1>
        <p style="color: #888; font-size: 14px; line-height: 1.5;">Hola <strong>${nombre}</strong>, hemos reservado tus productos. Para iniciar el despacho, por favor completa la transferencia.</p>
      </div>
  
      <div style="background-color: #101010; border: 1px solid #009970; border-radius: 15px; padding: 25px; text-align: center; margin-bottom: 30px; box-shadow: 0 0 20px rgba(0, 153, 112, 0.1);">
        <p style="color: #009970; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-top: 0; font-size: 12px;">Datos de Transferencia</p>
        
        <div style="margin-bottom: 15px;">
          <span style="color: #555; font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">Banco</span><br>
          <strong style="font-size: 16px;">Banco Santander</strong>
        </div>
        
        <div style="margin-bottom: 15px;">
          <span style="color: #555; font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">Tipo de Cuenta</span><br>
          <strong style="font-size: 16px;">Cuenta Corriente</strong>
        </div>
  
        <div style="margin-bottom: 20px;">
          <span style="color: #555; font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">Número de Cuenta</span><br>
          <strong style="font-size: 22px; letter-spacing: 2px; color: #fff;">987654321</strong>
        </div>
        
         <div style="margin-bottom: 20px;">
          <span style="color: #555; font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">RUT</span><br>
          <strong style="font-size: 16px; color: #fff;">12.345.678-9</strong>
        </div>
  
        <div style="background: rgba(0, 153, 112, 0.1); padding: 15px; border-radius: 8px; font-size: 18px; border: 1px solid rgba(0, 153, 112, 0.3);">
          Total: <strong style="color: #00ff41;">$${total.toLocaleString('es-CL')}</strong>
        </div>
      </div>
  
      <div style="background-color: #111; padding: 20px; border-radius: 12px; margin-bottom: 30px;">
        <p style="color: #555; font-size: 11px; text-transform: uppercase; margin-top: 0; letter-spacing: 1px;">Resumen del Pedido #${orderId.toString().slice(-6).toUpperCase()}</p>
        ${itemsHtml}
      </div>
  
      <div style="text-align: center; border-top: 1px solid #222; padding-top: 20px;">
        <p style="color: #555; font-size: 12px; line-height: 1.5;">
          Tienes <strong>2 horas</strong> para enviar el comprobante.<br>
          Responde a este correo con la foto.
        </p>
      </div>
    </div>
    `;
};