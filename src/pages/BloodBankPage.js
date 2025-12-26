import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Grid, 
  Card, 
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Alert
} from '@mui/material';
import { 
  ArrowBack, 
  Bloodtype, 
  People, 
  Emergency, 
  AddCircle,
  Search,
  Warning,
  CheckCircle,
  Error
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const BloodBankPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { title: 'Available Units', value: '1,245', icon: <Bloodtype />, color: '#d32f2f' },
    { title: 'Active Donors', value: '856', icon: <People />, color: '#1976d2' },
    { title: 'Requests Today', value: '42', icon: <Emergency />, color: '#ed6c02' },
    { title: 'Lives Saved', value: '5,678', icon: <AddCircle />, color: '#2e7d32' },
  ];

  const bloodInventory = [
    { group: 'A+', units: 245, status: 'Sufficient', color: '#d32f2f' },
    { group: 'A-', units: 85, status: 'Low', color: '#f44336' },
    { group: 'B+', units: 187, status: 'Sufficient', color: '#9c27b0' },
    { group: 'B-', units: 45, status: 'Critical', color: '#673ab7' },
    { group: 'AB+', units: 67, status: 'Sufficient', color: '#3f51b5' },
    { group: 'AB-', units: 12, status: 'Critical', color: '#2196f3' },
    { group: 'O+', units: 432, status: 'Sufficient', color: '#03a9f4' },
    { group: 'O-', units: 23, status: 'Critical', color: '#00bcd4' },
  ];

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box sx={{ mt: 4, mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          sx={{ mb: 3 }}
        >
          Back to Home
        </Button>
        
        <Typography variant="h3" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <Bloodtype sx={{ mr: 2, color: '#d32f2f' }} />
          Arogyadwar Blood Bank
        </Typography>
        
        <Typography variant="h6" color="text.secondary" paragraph>
          Saving lives through blood donation. Find blood, donate blood, save lives.
        </Typography>
      </Box>

      {/* Navigation Tabs */}
      <Paper sx={{ mb: 3, p: 1 }}>
        <Box sx={{ display: 'flex', overflowX: 'auto' }}>
          <Button
            sx={{ mx: 1 }}
            color={activeTab === 'overview' ? 'primary' : 'inherit'}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </Button>
          <Button
            sx={{ mx: 1 }}
            color={activeTab === 'inventory' ? 'primary' : 'inherit'}
            onClick={() => setActiveTab('inventory')}
            startIcon={<Bloodtype />}
          >
            Blood Inventory
          </Button>
          <Button
            sx={{ mx: 1 }}
            color={activeTab === 'donors' ? 'primary' : 'inherit'}
            onClick={() => setActiveTab('donors')}
            startIcon={<People />}
          >
            Find Donors
          </Button>
          <Button
            sx={{ mx: 1 }}
            color={activeTab === 'donate' ? 'primary' : 'inherit'}
            onClick={() => setActiveTab('donate')}
            startIcon={<AddCircle />}
          >
            Donate Blood
          </Button>
          <Button
            sx={{ mx: 1 }}
            color={activeTab === 'request' ? 'primary' : 'inherit'}
            onClick={() => setActiveTab('request')}
            startIcon={<Emergency />}
          >
            Request Blood
          </Button>
        </Box>
      </Paper>

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <>
          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ color: stat.color, mr: 2 }}>{stat.icon}</Box>
                      <Typography variant="h6">{stat.title}</Typography>
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {stat.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Emergency Alert */}
          <Alert severity="error" sx={{ mb: 3 }}>
            <strong>Emergency:</strong> O- and B- blood groups are critically low. Urgent donations needed!
          </Alert>

          {/* Blood Inventory Table */}
          <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
            Current Blood Inventory
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Blood Group</TableCell>
                  <TableCell>Units Available</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bloodInventory.map((item) => (
                  <TableRow key={item.group}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Bloodtype sx={{ mr: 1, color: item.color }} />
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          {item.group}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{item.units}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={item.status === 'Critical' ? <Error /> : 
                              item.status === 'Low' ? <Warning /> : <CheckCircle />}
                        label={item.status}
                        color={item.status === 'Critical' ? 'error' : 
                               item.status === 'Low' ? 'warning' : 'success'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="small" 
                        variant="outlined"
                        onClick={() => setActiveTab('request')}
                      >
                        Request
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Quick Actions */}
          <Grid container spacing={3} sx={{ mt: 4 }}>
            <Grid item xs={12} md={6}>
              <Card sx={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => setActiveTab('donate')}>
                <CardContent>
                  <AddCircle sx={{ fontSize: 60, color: '#d32f2f', mb: 2 }} />
                  <Typography variant="h5" gutterBottom>Become a Donor</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Register as a blood donor and save lives
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => setActiveTab('request')}>
                <CardContent>
                  <Emergency sx={{ fontSize: 60, color: '#d32f2f', mb: 2 }} />
                  <Typography variant="h5" gutterBottom>Emergency Request</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Request blood urgently for patients in need
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}

      {activeTab === 'inventory' && (
        <Box>
          <Typography variant="h4" gutterBottom>Blood Inventory</Typography>
          <Typography variant="body1" paragraph>
            Detailed view of all blood units available in our blood bank.
          </Typography>
          {/* Add detailed inventory table here */}
        </Box>
      )}

      {activeTab === 'donors' && (
        <Box>
          <Typography variant="h4" gutterBottom>Find Donors</Typography>
          <Typography variant="body1" paragraph>
            Search and connect with blood donors in your area.
          </Typography>
          {/* Add donor search functionality here */}
        </Box>
      )}

      {activeTab === 'donate' && (
        <Box>
          <Typography variant="h4" gutterBottom>Donate Blood</Typography>
          <Typography variant="body1" paragraph>
            Register as a blood donor and schedule your donation.
          </Typography>
          {/* Add donation form here */}
        </Box>
      )}

      {activeTab === 'request' && (
        <Box>
          <Typography variant="h4" gutterBottom>Request Blood</Typography>
          <Typography variant="body1" paragraph>
            Submit a blood request for patients in need.
          </Typography>
          {/* Add blood request form here */}
        </Box>
      )}
    </Container>
  );
};

export default BloodBankPage;