import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Chip,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  IconButton,
  Alert,
} from '@mui/material';
import {
  Bloodtype,
  Warning,
  CheckCircle,
  Error,
  Search,
  FilterList,
} from '@mui/icons-material';

const BloodInventory = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const inventoryData = [
    { id: 1, group: 'A+', type: 'Whole Blood', quantity: 245, status: 'Available', location: 'Main Storage', expiry: '2024-03-15' },
    { id: 2, group: 'A-', type: 'Whole Blood', quantity: 85, status: 'Low', location: 'Main Storage', expiry: '2024-03-10' },
    { id: 3, group: 'B+', type: 'Plasma', quantity: 187, status: 'Available', location: 'North Wing', expiry: '2024-03-20' },
    { id: 4, group: 'B-', type: 'Whole Blood', quantity: 45, status: 'Critical', location: 'Main Storage', expiry: '2024-03-05' },
    { id: 5, group: 'AB+', type: 'Platelets', quantity: 67, status: 'Available', location: 'South Wing', expiry: '2024-03-18' },
    { id: 6, group: 'AB-', type: 'Whole Blood', quantity: 12, status: 'Critical', location: 'Main Storage', expiry: '2024-03-03' },
    { id: 7, group: 'O+', type: 'Whole Blood', quantity: 432, status: 'Available', location: 'Main Storage', expiry: '2024-03-25' },
    { id: 8, group: 'O-', type: 'Whole Blood', quantity: 23, status: 'Critical', location: 'Emergency Stock', expiry: '2024-03-08' },
  ];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'success';
      case 'Low': return 'warning';
      case 'Critical': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Available': return <CheckCircle />;
      case 'Low': return <Warning />;
      case 'Critical': return <Error />;
      default: return null;
    }
  };

  const filteredInventory = inventoryData.filter(item => {
    if (filter !== 'all' && item.group !== filter) return false;
    if (searchTerm && !item.group.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      {/* Search and Filter */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search blood group..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="Filter by Blood Group"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <MenuItem value="all">All Blood Groups</MenuItem>
              {bloodGroups.map(group => (
                <MenuItem key={group} value={group}>{group}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              onClick={() => {
                setSearchTerm('');
                setFilter('all');
              }}
              fullWidth
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Critical Alert */}
      {filteredInventory.some(item => item.status === 'Critical') && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <strong>Emergency:</strong> Critical blood shortage detected. Urgent donations needed.
        </Alert>
      )}

      {/* Inventory Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Blood Group</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Quantity (Units)</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Storage Location</TableCell>
              <TableCell>Expiry Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInventory.map((item) => (
              <TableRow key={item.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Bloodtype sx={{ mr: 1, color: '#d32f2f' }} />
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {item.group}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontWeight: 'bold',
                      color: item.quantity < 50 ? '#f44336' : 'inherit'
                    }}
                  >
                    {item.quantity}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    icon={getStatusIcon(item.status)}
                    label={item.status}
                    color={getStatusColor(item.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.expiry}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredInventory.length === 0 && (
        <Paper sx={{ p: 4, mt: 2, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No blood units found matching your criteria
          </Typography>
        </Paper>
      )}

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Total Units
              </Typography>
              <Typography variant="h4">
                {inventoryData.reduce((sum, item) => sum + item.quantity, 0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Available Groups
              </Typography>
              <Typography variant="h4">
                {new Set(inventoryData.map(item => item.group)).size}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Critical Groups
              </Typography>
              <Typography variant="h4" color="error">
                {inventoryData.filter(item => item.status === 'Critical').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default BloodInventory;