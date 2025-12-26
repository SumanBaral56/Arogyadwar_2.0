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
  Avatar,
  IconButton,
  MenuItem,
} from '@mui/material';
import {
  Search,
  FilterList,
  LocationOn,
  Phone,
  Email,
  Bloodtype,
  CheckCircle,
  Cancel,
  Visibility,
} from '@mui/icons-material';

const BloodDonors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bloodGroupFilter, setBloodGroupFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  const donorsData = [
    { id: 1, name: 'Rajesh Kumar', bloodGroup: 'O+', age: 28, location: 'Mumbai', phone: '+91 9876543210', lastDonation: '2024-01-15', status: 'Available' },
    { id: 2, name: 'Priya Sharma', bloodGroup: 'B+', age: 25, location: 'Delhi', phone: '+91 9876543211', lastDonation: '2024-02-20', status: 'Available' },
    { id: 3, name: 'Amit Patel', bloodGroup: 'A-', age: 32, location: 'Bangalore', phone: '+91 9876543212', lastDonation: '2023-12-10', status: 'Available' },
    { id: 4, name: 'Sneha Reddy', bloodGroup: 'AB+', age: 30, location: 'Hyderabad', phone: '+91 9876543213', lastDonation: '2024-01-30', status: 'Unavailable' },
    { id: 5, name: 'Vikram Singh', bloodGroup: 'O-', age: 35, location: 'Chennai', phone: '+91 9876543214', lastDonation: '2024-03-01', status: 'Available' },
    { id: 6, name: 'Anjali Mehta', bloodGroup: 'B-', age: 27, location: 'Mumbai', phone: '+91 9876543215', lastDonation: '2024-02-15', status: 'Available' },
    { id: 7, name: 'Rohan Verma', bloodGroup: 'A+', age: 31, location: 'Delhi', phone: '+91 9876543216', lastDonation: '2024-01-25', status: 'Unavailable' },
    { id: 8, name: 'Pooja Joshi', bloodGroup: 'AB-', age: 29, location: 'Bangalore', phone: '+91 9876543217', lastDonation: '2024-03-05', status: 'Available' },
  ];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const locations = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'];

  const filteredDonors = donorsData.filter(donor => {
    if (bloodGroupFilter !== 'all' && donor.bloodGroup !== bloodGroupFilter) return false;
    if (locationFilter !== 'all' && donor.location !== locationFilter) return false;
    if (searchTerm && !donor.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusColor = (status) => {
    return status === 'Available' ? 'success' : 'error';
  };

  return (
    <>
      {/* Search and Filter */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search donors by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              select
              fullWidth
              label="Blood Group"
              value={bloodGroupFilter}
              onChange={(e) => setBloodGroupFilter(e.target.value)}
            >
              <MenuItem value="all">All Groups</MenuItem>
              {bloodGroups.map(group => (
                <MenuItem key={group} value={group}>{group}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              select
              fullWidth
              label="Location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <MenuItem value="all">All Locations</MenuItem>
              {locations.map(location => (
                <MenuItem key={location} value={location}>{location}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              onClick={() => {
                setSearchTerm('');
                setBloodGroupFilter('all');
                setLocationFilter('all');
              }}
              fullWidth
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Donors Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Donor</TableCell>
              <TableCell>Blood Group</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Last Donation</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDonors.map((donor) => (
              <TableRow key={donor.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ mr: 2, bgcolor: '#d32f2f' }}>
                      {getInitials(donor.name)}
                    </Avatar>
                    <Typography variant="subtitle1">{donor.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    icon={<Bloodtype />}
                    label={donor.bloodGroup}
                    color="error"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>{donor.age}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn sx={{ mr: 0.5, fontSize: 'small' }} />
                    {donor.location}
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{donor.phone}</Typography>
                </TableCell>
                <TableCell>{donor.lastDonation}</TableCell>
                <TableCell>
                  <Chip
                    icon={donor.status === 'Available' ? <CheckCircle /> : <Cancel />}
                    label={donor.status}
                    color={getStatusColor(donor.status)}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredDonors.length === 0 && (
        <Paper sx={{ p: 4, mt: 2, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No donors found matching your criteria
          </Typography>
        </Paper>
      )}

      {/* Stats */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Total Donors
              </Typography>
              <Typography variant="h4">{donorsData.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Available Now
              </Typography>
              <Typography variant="h4" color="success.main">
                {donorsData.filter(d => d.status === 'Available').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                O- Donors
              </Typography>
              <Typography variant="h4" color="error.main">
                {donorsData.filter(d => d.bloodGroup === 'O-').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Most Common
              </Typography>
              <Typography variant="h4">O+</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default BloodDonors;