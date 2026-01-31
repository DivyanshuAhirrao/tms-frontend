import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SHIPMENTS } from '../graphql/queries';
import { CREATE_SHIPMENT, UPDATE_SHIPMENT, DELETE_SHIPMENT, FLAG_SHIPMENT } from '../graphql/mutations';
import Layout from '../components/layout/Layout/Layout';
import ShipmentGrid from '../components/shipments/ShipmentGrid/ShipmentGrid';
import ShipmentTiles from '../components/shipments/ShipmentTiles/ShipmentTiles';
import ShipmentDetail from '../components/shipments/ShipmentDetail/ShipmentDetail';
import ShipmentForm from '../components/shipments/ShipmentForm/ShipmentForm';
import Button from '../components/common/Button/Button';
import Loader from '../components/common/Loader/Loader';
import ErrorMessage from '../components/common/ErrorMessage/ErrorMessage';
import { VIEW_MODES } from '../utils/constants';
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [viewMode, setViewMode] = useState(VIEW_MODES.GRID);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [editingShipment, setEditingShipment] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  
  const { loading, error, data, refetch } = useQuery(GET_SHIPMENTS, {
    variables: {
      page: { page: currentPage, size: pageSize },
      sortBy: 'createdAt',
      sortDirection: 'DESC'
    }
  });
  
  const [createShipment, { loading: creating }] = useMutation(CREATE_SHIPMENT, {
    onCompleted: () => {
      setShowForm(false);
      refetch();
    }
  });
  
  const [updateShipment, { loading: updating }] = useMutation(UPDATE_SHIPMENT, {
    onCompleted: () => {
      setShowForm(false);
      setEditingShipment(null);
      refetch();
    }
  });
  
  const [deleteShipment] = useMutation(DELETE_SHIPMENT, {
    onCompleted: () => refetch()
  });
  
  const [flagShipment] = useMutation(FLAG_SHIPMENT, {
    onCompleted: () => refetch()
  });
  
  const handleCreate = () => {
    setEditingShipment(null);
    setShowForm(true);
  };
  
  const handleEdit = (shipment) => {
    setEditingShipment(shipment);
    setShowForm(true);
  };
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this shipment?')) {
      deleteShipment({ variables: { id: id.toString() } });
    }
  };
  
  const handleFlag = (id, flagged) => {
    flagShipment({ variables: { id: id.toString(), flagged } });
  };
  
  const handleSubmit = (formData) => {
    if (editingShipment) {
      updateShipment({
        variables: {
          id: editingShipment.id.toString(),
          input: formData
        }
      });
    } else {
      createShipment({ variables: { input: formData } });
    }
  };
  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  
  if (loading && !data) return <Loader fullPage />;
  if (error) return <ErrorMessage message={error.message} onRetry={refetch} />;
  
  const shipments = data?.shipments?.content || [];
  const pagination = data?.shipments || {};
  
  return (
    <Layout user={user}>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <div>
            <h1>Shipments Dashboard</h1>
            <p>Manage and track all your shipments</p>
          </div>
          <Button onClick={handleCreate}>+ Create Shipment</Button>
        </div>
        
        <div className={styles.controls}>
          <div className={styles.viewToggle}>
            <button
              className={viewMode === VIEW_MODES.GRID ? styles.active : ''}
              onClick={() => setViewMode(VIEW_MODES.GRID)}
            >
              ▦ Grid View
            </button>
            <button
              className={viewMode === VIEW_MODES.TILES ? styles.active : ''}
              onClick={() => setViewMode(VIEW_MODES.TILES)}
            >
              ▦ Tile View
            </button>
          </div>
          
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span>Total:</span>
              <strong>{pagination.totalElements || 0}</strong>
            </div>
            <div className={styles.stat}>
              <span>Page:</span>
              <strong>{(pagination.currentPage || 0) + 1} / {pagination.totalPages || 1}</strong>
            </div>
          </div>
        </div>
        
        <div className={styles.content}>
          {viewMode === VIEW_MODES.GRID ? (
            <ShipmentGrid
              shipments={shipments}
              onSelectShipment={setSelectedShipment}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onFlag={handleFlag}
              userRole={user.role}
            />
          ) : (
            <ShipmentTiles
              shipments={shipments}
              onSelectShipment={setSelectedShipment}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onFlag={handleFlag}
              userRole={user.role}
            />
          )}
        </div>
        
        {pagination.totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!pagination.hasPrevious}
            >
              Previous
            </button>
            <span>Page {currentPage + 1} of {pagination.totalPages}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!pagination.hasNext}
            >
              Next
            </button>
          </div>
        )}
        
        <ShipmentDetail
          shipment={selectedShipment}
          isOpen={!!selectedShipment}
          onClose={() => setSelectedShipment(null)}
        />
        
        <ShipmentForm
          isOpen={showForm}
          onClose={() => {
            setShowForm(false);
            setEditingShipment(null);
          }}
          onSubmit={handleSubmit}
          shipment={editingShipment}
          loading={creating || updating}
        />
      </div>
    </Layout>
  );
};

export default Dashboard;
