import React, { useState, useEffect } from 'react';
import Modal from '../../common/Modal/Modal';
import Button from '../../common/Button/Button';
import { SHIPMENT_STATUS } from '../../../utils/constants';
import styles from './ShipmentForm.module.scss';

const ShipmentForm = ({ isOpen, onClose, onSubmit, shipment, loading }) => {
  const [formData, setFormData] = useState({
    shipmentNumber: '',
    shipperName: '',
    shipperEmail: '',
    shipperPhone: '',
    carrierName: '',
    carrierContact: '',
    pickupLocation: '',
    pickupDate: '',
    deliveryLocation: '',
    deliveryDate: '',
    trackingNumber: '',
    status: 'PENDING',
    weight: '',
    dimensions: '',
    rate: '',
    currency: 'USD',
    specialInstructions: ''
  });
  
  useEffect(() => {
    if (shipment) {
      setFormData({
        shipmentNumber: shipment.shipmentNumber || '',
        shipperName: shipment.shipperName || '',
        shipperEmail: shipment.shipperEmail || '',
        shipperPhone: shipment.shipperPhone || '',
        carrierName: shipment.carrierName || '',
        carrierContact: shipment.carrierContact || '',
        pickupLocation: shipment.pickupLocation || '',
        pickupDate: shipment.pickupDate || '',
        deliveryLocation: shipment.deliveryLocation || '',
        deliveryDate: shipment.deliveryDate || '',
        trackingNumber: shipment.trackingNumber || '',
        status: shipment.status || 'PENDING',
        weight: shipment.weight || '',
        dimensions: shipment.dimensions || '',
        rate: shipment.rate || '',
        currency: shipment.currency || 'USD',
        specialInstructions: shipment.specialInstructions || ''
      });
    } else {
      setFormData({
        shipmentNumber: '',
        shipperName: '',
        shipperEmail: '',
        shipperPhone: '',
        carrierName: '',
        carrierContact: '',
        pickupLocation: '',
        pickupDate: '',
        deliveryLocation: '',
        deliveryDate: '',
        trackingNumber: '',
        status: 'PENDING',
        weight: '',
        dimensions: '',
        rate: '',
        currency: 'USD',
        specialInstructions: ''
      });
    }
  }, [shipment]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      weight: formData.weight ? parseFloat(formData.weight) : null,
      rate: formData.rate ? parseFloat(formData.rate) : null
    };
    onSubmit(submitData);
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={shipment ? 'Edit Shipment' : 'Create Shipment'} size="large">
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Shipment Number *</label>
            <input
              type="text"
              name="shipmentNumber"
              value={formData.shipmentNumber}
              onChange={handleChange}
              required
              disabled={!!shipment}
            />
          </div>
          
          <div className={styles.field}>
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              {Object.values(SHIPMENT_STATUS).map(status => (
                <option key={status} value={status}>{status.replace('_', ' ')}</option>
              ))}
            </select>
          </div>
          
          <div className={styles.field}>
            <label>Shipper Name *</label>
            <input
              type="text"
              name="shipperName"
              value={formData.shipperName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.field}>
            <label>Shipper Email</label>
            <input
              type="email"
              name="shipperEmail"
              value={formData.shipperEmail}
              onChange={handleChange}
            />
          </div>
          
          <div className={styles.field}>
            <label>Shipper Phone</label>
            <input
              type="tel"
              name="shipperPhone"
              value={formData.shipperPhone}
              onChange={handleChange}
            />
          </div>
          
          <div className={styles.field}>
            <label>Carrier Name *</label>
            <input
              type="text"
              name="carrierName"
              value={formData.carrierName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.field}>
            <label>Carrier Contact</label>
            <input
              type="text"
              name="carrierContact"
              value={formData.carrierContact}
              onChange={handleChange}
            />
          </div>
          
          <div className={styles.field}>
            <label>Tracking Number</label>
            <input
              type="text"
              name="trackingNumber"
              value={formData.trackingNumber}
              onChange={handleChange}
            />
          </div>
          
          <div className={styles.field}>
            <label>Pickup Location *</label>
            <input
              type="text"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.field}>
            <label>Pickup Date</label>
            <input
              type="date"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleChange}
            />
          </div>
          
          <div className={styles.field}>
            <label>Delivery Location *</label>
            <input
              type="text"
              name="deliveryLocation"
              value={formData.deliveryLocation}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.field}>
            <label>Delivery Date</label>
            <input
              type="date"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleChange}
            />
          </div>
          
          <div className={styles.field}>
            <label>Weight (kg)</label>
            <input
              type="number"
              step="0.01"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>
          
          <div className={styles.field}>
            <label>Dimensions</label>
            <input
              type="text"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleChange}
              placeholder="e.g., 48x40x36 in"
            />
          </div>
          
          <div className={styles.field}>
            <label>Rate</label>
            <input
              type="number"
              step="0.01"
              name="rate"
              value={formData.rate}
              onChange={handleChange}
            />
          </div>
          
          <div className={styles.field}>
            <label>Currency</label>
            <select name="currency" value={formData.currency} onChange={handleChange}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>
        
        <div className={styles.field}>
          <label>Special Instructions</label>
          <textarea
            name="specialInstructions"
            value={formData.specialInstructions}
            onChange={handleChange}
            rows="3"
          />
        </div>
        
        <div className={styles.actions}>
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : shipment ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ShipmentForm;
