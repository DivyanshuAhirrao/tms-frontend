import { gql } from '@apollo/client';

export const GET_SHIPMENTS = gql`
  query GetShipments(
    $filter: ShipmentFilter
    $page: PageInput
    $sortBy: String
    $sortDirection: SortDirection
  ) {
    shipments(
      filter: $filter
      page: $page
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      content {
        id
        shipmentNumber
        shipperName
        shipperEmail
        shipperPhone
        carrierName
        carrierContact
        pickupLocation
        pickupDate
        deliveryLocation
        deliveryDate
        trackingNumber
        status
        weight
        dimensions
        rate
        currency
        specialInstructions
        flagged
        createdAt
        updatedAt
      }
      totalElements
      totalPages
      currentPage
      pageSize
      hasNext
      hasPrevious
    }
  }
`;

export const GET_SHIPMENT = gql`
  query GetShipment($id: ID!) {
    shipment(id: $id) {
      id
      shipmentNumber
      shipperName
      shipperEmail
      shipperPhone
      carrierName
      carrierContact
      pickupLocation
      pickupDate
      deliveryLocation
      deliveryDate
      trackingNumber
      status
      weight
      dimensions
      rate
      currency
      specialInstructions
      flagged
      createdAt
      updatedAt
    }
  }
`;

export const GET_ME = gql`
  query GetMe {
    me {
      id
      username
      email
      role
    }
  }
`;
