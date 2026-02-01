import React, { useState } from "react";
import { STATUS_COLORS } from "../../../utils/constants";
import styles from "./ShipmentTiles.module.scss";

const ShipmentTiles = ({
  shipments,
  onSelectShipment,
  onEdit,
  onDelete,
  onFlag,
  userRole,
}) => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (id, e) => {
    e.stopPropagation();
    setOpenMenu(openMenu === id ? null : id);
  };

  return (
    <div className={styles.tilesContainer}>
      {shipments.map((shipment) => (
        <div
          key={shipment.id}
          className={`${styles.tile} ${shipment.flagged ? styles.flagged : ""}`}
          onClick={() => onSelectShipment(shipment)}
        >
          <div className={styles.header}>
            <div className={styles.shipmentNumber}>
              {shipment.shipmentNumber}
            </div>
            <div className={styles.menuWrapper}>
              <button
                className={styles.menuBtn}
                onClick={(e) => toggleMenu(shipment.id, e)}
              >
                ⋮
              </button>
              {openMenu === shipment.id && (
                <div
                  className={styles.menu}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => {
                      onEdit(shipment);
                      setOpenMenu(null);
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => {
                      onFlag(shipment.id, !shipment.flagged);
                      setOpenMenu(null);
                    }}
                  >
                    🚩 {shipment.flagged ? "Unflag" : "Flag"}
                  </button>
                  {userRole === "ADMIN" && (
                    <button
                      className={styles.delete}
                      onClick={() => {
                        onDelete(shipment.id);
                        setOpenMenu(null);
                      }}
                    >
                      🗑️ Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <div
            className={styles.status}
            style={{ backgroundColor: STATUS_COLORS[shipment.status] }}
          >
            {shipment.status.replace("_", " ")}
          </div>

          <div className={styles.content}>
            <div className={styles.field}>
              <span className={styles.label}>Shipper:</span>
              <span className={styles.value}>{shipment.shipperName}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Carrier:</span>
              <span className={styles.value}>{shipment.carrierName}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>From:</span>
              <span className={styles.value}>{shipment.pickupLocation}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>To:</span>
              <span className={styles.value}>{shipment.deliveryLocation}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Tracking:</span>
              <span className={styles.value}>
                {shipment.trackingNumber || "N/A"}
              </span>
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.info}>
              <span className={styles.rate}>
                ${shipment.rate?.toFixed(2) || "0.00"}
              </span>
              <span className={styles.weight}>
                {shipment.weight ? `${shipment.weight} kg` : ""}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShipmentTiles;
