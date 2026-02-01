import React from "react";
import { STATUS_COLORS } from "../../../utils/constants";
import styles from "./ShipmentGrid.module.scss";

const ShipmentGrid = ({
  shipments,
  onSelectShipment,
  onEdit,
  onDelete,
  onFlag,
  userRole,
}) => {
  const getStatusBadge = (status) => {
    return (
      <span
        className={styles.statusBadge}
        style={{ backgroundColor: STATUS_COLORS[status] }}
      >
        {status.replace("_", " ")}
      </span>
    );
  };

  return (
    <div className={styles.gridContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Shipment #</th>
            <th>Shipper</th>
            <th>Carrier</th>
            <th>Pickup</th>
            <th>Delivery</th>
            <th>Status</th>
            <th>Tracking #</th>
            <th>Rate</th>
            <th>Weight</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr
              key={shipment.id}
              className={shipment.flagged ? styles.flagged : ""}
              onClick={() => onSelectShipment(shipment)}
            >
              <td className={styles.shipmentNumber}>
                {shipment.shipmentNumber}
              </td>
              <td>{shipment.shipperName}</td>
              <td>{shipment.carrierName}</td>
              <td>{shipment.pickupLocation}</td>
              <td>{shipment.deliveryLocation}</td>
              <td>{getStatusBadge(shipment.status)}</td>
              <td>{shipment.trackingNumber || "N/A"}</td>
              <td>${shipment.rate?.toFixed(2) || "0.00"}</td>
              <td>{shipment.weight ? `${shipment.weight} kg` : "N/A"}</td>
              <td>
                <div
                  className={styles.actions}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className={styles.actionBtn}
                    onClick={() => onEdit(shipment)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    className={`${styles.actionBtn} ${shipment.flagged ? styles.flagged : ""}`}
                    onClick={() => onFlag(shipment.id, !shipment.flagged)}
                    title="Flag"
                  >
                    🚩
                  </button>
                  {userRole === "ADMIN" && (
                    <button
                      className={`${styles.actionBtn} ${styles.delete}`}
                      onClick={() => onDelete(shipment.id)}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShipmentGrid;
