import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        email
        role
      }
    }
  }
`;

export const CREATE_SHIPMENT = gql`
  mutation CreateShipment($input: ShipmentInput!) {
    createShipment(input: $input) {
      id
      shipmentNumber
      shipperName
      carrierName
      status
      createdAt
    }
  }
`;

export const UPDATE_SHIPMENT = gql`
  mutation UpdateShipment($id: ID!, $input: ShipmentInput!) {
    updateShipment(id: $id, input: $input) {
      id
      shipmentNumber
      shipperName
      carrierName
      status
      updatedAt
    }
  }
`;

export const DELETE_SHIPMENT = gql`
  mutation DeleteShipment($id: ID!) {
    deleteShipment(id: $id)
  }
`;

export const FLAG_SHIPMENT = gql`
  mutation FlagShipment($id: ID!, $flagged: Boolean!) {
    flagShipment(id: $id, flagged: $flagged) {
      id
      flagged
    }
  }
`;
