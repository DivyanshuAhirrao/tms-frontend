import React from 'react';
import Modal from '../../common/Modal/Modal';
import { STATUS_COLORS } from '../../../utils/constants';
import styles from './ShipmentDetail.module.scss';

const ShipmentDetail = ({ shipment, isOpen, onClose }) => {
  if (!shipment) return null;
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Shipment Details" size="large">
      <div className={styles.detail}>
        <div className={styles.header}>
          <h3 className={styles.shipmentNumber}>{shipment.shipmentNumber}</h3>
          <span 
            className={styles.status}
            style={{ backgroundColor: STATUS_COLORS[shipment.status] }}
          >
            {shipment.status.replace('_', ' ')}
          </span>
        </div>
        
        <div className={styles.grid}>
          <div className={styles.section}>
            <h4>Shipper Information</h4>
            <div className={styles.field}>
              <span>Name:</span>
              <strong>{shipment.shipperName}</strong>
            </div>
            <div className={styles.field}>
              <span>Email:</span>
              <strong>{shipment.shipperEmail || 'N/A'}</strong>
            </div>
            <div className={styles.field}>
              <span>Phone:</span>
              <strong>{shipment.shipperPhone || 'N/A'}</strong>
            </div>
          </div>
          
          <div className={styles.section}>
            <h4>Carrier Information</h4>
            <div className={styles.field}>
              <span>Name:</span>
              <strong>{shipment.carrierName}</strong>
            </div>
            <div className={styles.field}>
              <span>Contact:</span>
              <strong>{shipment.carrierContact || 'N/A'}</strong>
            </div>
            <div className={styles.field}>
              <span>Tracking Number:</span>
              <strong>{shipment.trackingNumber || 'N/A'}</strong>
            </div>
          </div>
          
          <div className={styles.section}>
            <h4>Pickup Details</h4>
            <div className={styles.field}>
              <span>Location:</span>
              <strong>{shipment.pickupLocation}</strong>
            </div>
            <div className={styles.field}>
              <span>Date:</span>
              <strong>{shipment.pickupDate || 'N/A'}</strong>
            </div>
          </div>
          
          <div className={styles.section}>
            <h4>Delivery Details</h4>
            <div className={styles.field}>
              <span>Location:</span>
              <strong>{shipment.deliveryLocation}</strong>
            </div>
            <div className={styles.field}>
              <span>Date:</span>
              <strong>{shipment.deliveryDate || 'N/A'}</strong>
            </div>
          </div>
          
          <div className={styles.section}>
            <h4>Package Information</h4>
            <div className={styles.field}>
              <span>Weight:</span>
              <strong>{shipment.weight ? `${shipment.weight} kg` : 'N/A'}</strong>
            </div>
            <div className={styles.field}>
              <span>Dimensions:</span>
              <strong>{shipment.dimensions || 'N/A'}</strong>
            </div>
          </div>
          
          <div className={styles.section}>
            <h4>Financial</h4>
            <div className={styles.field}>
              <span>Rate:</span>
              <strong>${shipment.rate?.toFixed(2) || '0.00'}</strong>
            </div>
            <div className={styles.field}>
              <span>Currency:</span>
              <strong>{shipment.currency || 'USD'}</strong>
            </div>
          </div>
        </div>
        
        {shipment.specialInstructions && (
          <div className={styles.instructions}>
            <h4>Special Instructions</h4>
            <p>{shipment.specialInstructions}</p>
          </div>
        )}
        
        <div className={styles.timestamps}>
          <div>Created: {formatDate(shipment.createdAt)}</div>
          <div>Updated: {formatDate(shipment.updatedAt)}</div>
        </div>
      </div>
    </Modal>
  );
};

export default ShipmentDetail;
