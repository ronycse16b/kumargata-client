import React, { useState } from 'react';
import QRCode from 'qrcode';
const InvoiceGenerator = ({invoiceData, ownerDetails, logoUrl}) => {
  // State for storing invoice data


  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-semibold">Invoice</h1>
        <p className="text-gray-600">Invoice Number: {invoiceData.invoiceNumber}</p>
        <p className="text-gray-600">Date: {invoiceData.date}</p>
      </div>
      <div className="text-right">
        <QRCode value={ownerDetails.qrData} size={64} />
        <img src={logoUrl} alt="Logo" className="w-16 h-16 ml-4" />
        <p className="font-semibold">{ownerDetails.name}</p>
        <p className="text-gray-600">{ownerDetails.address}</p>
        <p className="text-gray-600">{ownerDetails.email}</p>
      </div>
    </div>
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="py-2 px-4 text-left">Description</th>
          <th className="py-2 px-4 text-left">Quantity</th>
          <th className="py-2 px-4 text-left">Unit Price</th>
          <th className="py-2 px-4 text-left">Total</th>
        </tr>
      </thead>
      <tbody>
        {invoiceData.items.map((item, index) => (
          <tr key={index} className={(index % 2 === 0 ? 'bg-gray-50' : 'bg-white')}>
            <td className="py-2 px-4 border">{item.description}</td>
            <td className="py-2 px-4 border">{item.quantity}</td>
            <td className="py-2 px-4 border">{item.unitPrice}</td>
            <td className="py-2 px-4 border">{item.quantity * item.unitPrice}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="mt-6 flex justify-end">
      <p className="font-semibold">Total Amount Due: ${invoiceData.totalAmount}</p>
    </div>
  </div>
  
  );
};

export default InvoiceGenerator;
