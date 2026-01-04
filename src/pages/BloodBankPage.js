import React, { useState, useEffect } from 'react';
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
  Alert,
  TextField,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  IconButton,
  Divider,
  Badge,
  LinearProgress,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Switch,
  Tooltip,
  Fab,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Rating,
  CircularProgress,
  InputAdornment,
  FormGroup,
  Drawer,
  Breadcrumbs,
  Link
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
  Error,
  FilterList,
  LocationOn,
  Phone,
  Email,
  Schedule,
  LocalHospital,
  Favorite,
  Whatshot,
  TrendingUp,
  Visibility,
  CalendarToday,
  PersonAdd,
  Inventory,
  ArrowForward,
  Cancel,
  Speed,
  Timeline,
  PieChart,
  BarChart,
  Map,
  Notifications,
  Download,
  Share,
  Print,
  Edit,
  Delete,
  Star,
  FavoriteBorder,
  Navigation,
  Call,
  Message,
  WhatsApp,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  ExpandMore,
  ExpandLess,
  Refresh,
  CloudUpload,
  CloudDownload,
  Dashboard,
  Group,
  Assignment,
  Receipt,
  History,
  Settings,
  Help,
  Logout,
  Brightness4,
  Brightness7,
  Menu,
  Close,
  MoreVert,
  ArrowUpward,
  ArrowDownward,
  DoneAll,
  Pending,
  AccessTime,
  PersonPin,
  BloodtypeOutlined,
  Waves,
  Coronavirus,
  Sanitizer,
  LocalFireDepartment,
  VolunteerActivism,
  HealthAndSafety,
  MedicalServices,
  Biotech,
  Science,
  Security
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const BloodBankPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [bloodGroupFilter, setBloodGroupFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [openDonorDialog, setOpenDonorDialog] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [donationStep, setDonationStep] = useState(0);
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock loading effect
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Stats Data from first version
  const stats = [
    { 
      title: 'Available Units', 
      value: '1,245', 
      icon: <Bloodtype />, 
      color: '#d32f2f', 
      change: '+12%',
      trend: 'up',
      subtitle: 'Last 24 hours'
    },
    { 
      title: 'Active Donors', 
      value: '856', 
      icon: <People />, 
      color: '#1976d2', 
      change: '+5%',
      trend: 'up',
      subtitle: 'Registered donors'
    },
    { 
      title: 'Requests Today', 
      value: '42', 
      icon: <Emergency />, 
      color: '#ed6c02', 
      change: '-8%',
      trend: 'down',
      subtitle: 'Pending requests'
    },
    { 
      title: 'Lives Saved', 
      value: '5,678', 
      icon: <Favorite />, 
      color: '#2e7d32', 
      change: '+23%',
      trend: 'up',
      subtitle: 'Total saved'
    },
  ];

  // Quick Actions from first version
  const quickActions = [
    {
      title: 'Find Blood',
      description: 'Search for specific blood groups',
      icon: <Search />,
      color: '#d32f2f',
      action: () => setActiveTab('inventory'),
    },
    {
      title: 'Find Donors',
      description: 'Locate nearby blood donors',
      icon: <People />,
      color: '#1976d2',
      action: () => setActiveTab('donors'),
    },
    {
      title: 'Donate Blood',
      description: 'Register as a blood donor',
      icon: <AddCircle />,
      color: '#2e7d32',
      action: () => setActiveTab('donate'),
    },
    {
      title: 'Request Blood',
      description: 'Request blood for patient',
      icon: <Emergency />,
      color: '#ed6c02',
      action: () => setActiveTab('request'),
    },
  ];

  // Blood Inventory from first version with enhancements
  const bloodInventory = [
    { 
      id: 1, 
      group: 'A+', 
      type: 'Whole Blood', 
      quantity: 245, 
      status: 'Sufficient', 
      location: 'Main Storage', 
      expiry: '2024-03-15', 
      color: '#d32f2f',
      demand: 'High',
      usage: '75%'
    },
    { 
      id: 2, 
      group: 'A-', 
      type: 'Whole Blood', 
      quantity: 85, 
      status: 'Low', 
      location: 'Main Storage', 
      expiry: '2024-03-10', 
      color: '#f44336',
      demand: 'Medium',
      usage: '90%'
    },
    { 
      id: 3, 
      group: 'B+', 
      type: 'Plasma', 
      quantity: 187, 
      status: 'Sufficient', 
      location: 'North Wing', 
      expiry: '2024-03-20', 
      color: '#9c27b0',
      demand: 'Medium',
      usage: '60%'
    },
    { 
      id: 4, 
      group: 'B-', 
      type: 'Whole Blood', 
      quantity: 45, 
      status: 'Critical', 
      location: 'Emergency Stock', 
      expiry: '2024-03-05', 
      color: '#673ab7',
      demand: 'Very High',
      usage: '95%'
    },
    { 
      id: 5, 
      group: 'AB+', 
      type: 'Platelets', 
      quantity: 67, 
      status: 'Sufficient', 
      location: 'South Wing', 
      expiry: '2024-03-18', 
      color: '#3f51b5',
      demand: 'Low',
      usage: '40%'
    },
    { 
      id: 6, 
      group: 'AB-', 
      type: 'Whole Blood', 
      quantity: 12, 
      status: 'Critical', 
      location: 'Main Storage', 
      expiry: '2024-03-03', 
      color: '#2196f3',
      demand: 'High',
      usage: '98%'
    },
    { 
      id: 7, 
      group: 'O+', 
      type: 'Whole Blood', 
      quantity: 432, 
      status: 'Sufficient', 
      location: 'Main Storage', 
      expiry: '2024-03-25', 
      color: '#03a9f4',
      demand: 'Very High',
      usage: '80%'
    },
    { 
      id: 8, 
      group: 'O-', 
      type: 'Whole Blood', 
      quantity: 23, 
      status: 'Critical', 
      location: 'Emergency Stock', 
      expiry: '2024-03-08', 
      color: '#00bcd4',
      demand: 'Extreme',
      usage: '99%'
    },
  ];

  // Donors Data from first version with enhancements
  const donorsData = [
    { 
      id: 1, 
      name: 'Rajesh Kumar', 
      bloodGroup: 'O+', 
      age: 28, 
      location: 'Mumbai', 
      phone: '+91 9876543210', 
      email: 'rajesh@email.com',
      lastDonation: '2024-01-15', 
      nextEligible: '2024-04-15',
      status: 'Available',
      donations: 5,
      verified: true,
      avatarColor: '#d32f2f'
    },
    { 
      id: 2, 
      name: 'Priya Sharma', 
      bloodGroup: 'B+', 
      age: 25, 
      location: 'Delhi', 
      phone: '+91 9876543211', 
      email: 'priya@email.com',
      lastDonation: '2024-02-20', 
      nextEligible: '2024-05-20',
      status: 'Available',
      donations: 3,
      verified: true,
      avatarColor: '#1976d2'
    },
    { 
      id: 3, 
      name: 'Amit Patel', 
      bloodGroup: 'A-', 
      age: 32, 
      location: 'Bangalore', 
      phone: '+91 9876543212', 
      email: 'amit@email.com',
      lastDonation: '2023-12-10', 
      nextEligible: '2024-03-10',
      status: 'Available',
      donations: 8,
      verified: true,
      avatarColor: '#2e7d32'
    },
    { 
      id: 4, 
      name: 'Sneha Reddy', 
      bloodGroup: 'AB+', 
      age: 30, 
      location: 'Hyderabad', 
      phone: '+91 9876543213', 
      email: 'sneha@email.com',
      lastDonation: '2024-01-30', 
      nextEligible: '2024-04-30',
      status: 'Unavailable',
      donations: 4,
      verified: true,
      avatarColor: '#ed6c02'
    },
    { 
      id: 5, 
      name: 'Vikram Singh', 
      bloodGroup: 'O-', 
      age: 35, 
      location: 'Chennai', 
      phone: '+91 9876543214', 
      email: 'vikram@email.com',
      lastDonation: '2024-03-01', 
      nextEligible: '2024-06-01',
      status: 'Available',
      donations: 6,
      verified: true,
      avatarColor: '#9c27b0'
    },
  ];

  // Emergency Contacts
  const emergencyContacts = [
    { name: 'Emergency Helpline', number: '108', icon: <Emergency />, color: '#f44336' },
    { name: 'Blood Bank Control', number: '1800-123-4567', icon: <Phone />, color: '#2196f3' },
    { name: 'Ambulance', number: '102', icon: <LocalHospital />, color: '#4caf50' },
    { name: 'Police', number: '100', icon: <Security />, color: '#ff9800' },
  ];

  // Donation Steps
  const donationSteps = ['Personal Info', 'Health Check', 'Schedule', 'Confirmation'];
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const locations = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'];
  const donationCenters = [
    'Arogyadwar Main Center - Mumbai',
    'Arogyadwar North Center - Delhi',
    'Arogyadwar South Center - Bangalore',
    'Arogyadwar East Center - Kolkata',
    'Arogyadwar West Center - Pune',
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Sufficient': return 'success';
      case 'Available': return 'success';
      case 'Low': return 'warning';
      case 'Critical': return 'error';
      case 'Unavailable': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Sufficient': return <CheckCircle />;
      case 'Available': return <CheckCircle />;
      case 'Low': return <Warning />;
      case 'Critical': return <Error />;
      case 'Unavailable': return <Cancel />;
      default: return null;
    }
  };

  const handleViewDonor = (donor) => {
    setSelectedDonor(donor);
    setOpenDonorDialog(true);
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Donation Form State
  const [donationData, setDonationData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    address: '',
    weight: '',
    height: '',
    lastDonation: '',
    hasTattoo: false,
    hasSurgery: false,
    hasDisease: false,
    diseaseDetails: '',
    preferredDate: '',
    preferredTime: '',
    donationCenter: '',
    emergencyContact: '',
    emergencyPhone: '',
    termsAccepted: false,
  });

  // Request Form State
  const [requestData, setRequestData] = useState({
    requesterType: 'patient',
    hospitalName: '',
    patientName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    patientAge: '',
    patientGender: '',
    patientBloodGroup: '',
    diagnosis: '',
    urgency: 'normal',
    requiredBloodGroup: '',
    bloodType: 'Whole Blood',
    quantity: 1,
    requiredDate: '',
    requiredTime: '',
    specialRequirements: '',
    previousRequests: '',
  });

  const [errors, setErrors] = useState({});
  const [donationSubmitted, setDonationSubmitted] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  // Filtered Inventory
  const filteredInventory = bloodInventory.filter(item => {
    if (bloodGroupFilter !== 'all' && item.group !== bloodGroupFilter) return false;
    if (searchTerm && !item.group.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  // Filtered Donors
  const filteredDonors = donorsData.filter(donor => {
    if (bloodGroupFilter !== 'all' && donor.bloodGroup !== bloodGroupFilter) return false;
    if (locationFilter !== 'all' && donor.location !== locationFilter) return false;
    if (searchTerm && !donor.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  // Render Content based on Active Tab
  const renderContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
          <CircularProgress />
        </Box>
      );
    }

    switch (activeTab) {
      case 'inventory':
        return renderInventory();
      case 'donors':
        return renderDonors();
      case 'donate':
        return renderDonate();
      case 'request':
        return renderRequest();
      default:
        return renderOverview();
    }
  };

  const renderOverview = () => (
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
                <Typography variant="body2" color="text.secondary">
                  {stat.subtitle}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Quick Actions
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {quickActions.map((action, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                }
              }}
              onClick={action.action}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{ color: action.color, fontSize: 40, mb: 2 }}>
                  {action.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {action.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {action.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Blood Inventory Overview */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Blood Inventory Status
      </Typography>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2}>
          {bloodInventory.map((item) => (
            <Grid item xs={6} sm={4} md={3} key={item.id}>
              <Box
                sx={{
                  p: 2,
                  border: `2px solid ${item.color}`,
                  borderRadius: 2,
                  textAlign: 'center',
                  bgcolor: `${item.color}10`,
                  position: 'relative',
                }}
              >
                <Typography variant="h4" color={item.color}>
                  {item.group}
                </Typography>
                <Typography variant="h6">{item.quantity} units</Typography>
                <Chip
                  icon={getStatusIcon(item.status)}
                  label={item.status}
                  color={getStatusColor(item.status)}
                  size="small"
                  sx={{ mt: 1 }}
                />
                {item.status === 'Critical' && (
                  <Badge
                    color="error"
                    variant="dot"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                    }}
                  />
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Emergency Banner */}
      <Paper
        sx={{
          p: 3,
          background: 'linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Emergency sx={{ fontSize: 40, mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Emergency Blood Needed!
        </Typography>
        <Typography variant="body1" paragraph>
          O- and B- blood groups are critically low. Urgent donations needed.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => setActiveTab('donate')}
          sx={{ mr: 2 }}
        >
          Donate Now
        </Button>
        <Button
          variant="outlined"
          sx={{ color: 'white', borderColor: 'white' }}
          size="large"
          onClick={() => setActiveTab('request')}
        >
          Emergency Request
        </Button>
      </Paper>
    </>
  );

  const renderInventory = () => (
    <>
      <Typography variant="h4" gutterBottom>Blood Inventory</Typography>
      
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
              value={bloodGroupFilter}
              onChange={(e) => setBloodGroupFilter(e.target.value)}
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
                setBloodGroupFilter('all');
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInventory.map((item) => (
              <TableRow key={item.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Bloodtype sx={{ mr: 1, color: item.color }} />
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
                {bloodInventory.reduce((sum, item) => sum + item.quantity, 0)}
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
                {bloodInventory.filter(item => item.status === 'Critical').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Last Updated
              </Typography>
              <Typography variant="h6">
                Just now
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );

  const renderDonors = () => (
    <>
      <Typography variant="h4" gutterBottom>Find Blood Donors</Typography>
      
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDonors.map((donor) => (
              <TableRow key={donor.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ mr: 2, bgcolor: donor.avatarColor }}>
                      {getInitials(donor.name)}
                    </Avatar>
                    <Typography variant="subtitle1">{donor.name}</Typography>
                    {donor.verified && (
                      <Tooltip title="Verified Donor">
                        <CheckCircle sx={{ fontSize: 16, color: '#4caf50', ml: 1 }} />
                      </Tooltip>
                    )}
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
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleViewDonor(donor)}
                  >
                    <Visibility />
                  </IconButton>
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

  const renderDonate = () => {
    if (donationSubmitted) {
      return (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <CheckCircle sx={{ fontSize: 80, color: '#4caf50', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Thank You for Registering!
          </Typography>
          <Typography variant="body1" paragraph>
            You have been successfully registered as a blood donor.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Appointment Details:</strong>
          </Typography>
          <Card variant="outlined" sx={{ mb: 3, textAlign: 'left' }}>
            <CardContent>
              <Typography><strong>Name:</strong> {donationData.fullName}</Typography>
              <Typography><strong>Blood Group:</strong> {donationData.bloodGroup}</Typography>
              <Typography><strong>Appointment Date:</strong> {donationData.preferredDate}</Typography>
              <Typography><strong>Center:</strong> {donationData.donationCenter}</Typography>
            </CardContent>
          </Card>
          <Button
            variant="contained"
            onClick={() => {
              setDonationSubmitted(false);
              setDonationStep(0);
            }}
          >
            Register Another Donor
          </Button>
        </Paper>
      );
    }

    return (
      <>
        <Typography variant="h4" gutterBottom>Become a Blood Donor</Typography>
        
        <Stepper activeStep={donationStep} sx={{ mb: 4 }}>
          {donationSteps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Paper sx={{ p: 3 }}>
          {donationStep === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={donationData.fullName}
                  onChange={(e) => setDonationData({...donationData, fullName: e.target.value})}
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={donationData.email}
                  onChange={(e) => setDonationData({...donationData, email: e.target.value})}
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={donationData.phone}
                  onChange={(e) => setDonationData({...donationData, phone: e.target.value})}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={donationData.dateOfBirth}
                  onChange={(e) => setDonationData({...donationData, dateOfBirth: e.target.value})}
                  error={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl component="fieldset">
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup row name="gender" value={donationData.gender} 
                    onChange={(e) => setDonationData({...donationData, gender: e.target.value})}>
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Blood Group"
                  name="bloodGroup"
                  value={donationData.bloodGroup}
                  onChange={(e) => setDonationData({...donationData, bloodGroup: e.target.value})}
                  error={!!errors.bloodGroup}
                  helperText={errors.bloodGroup}
                  required
                >
                  <MenuItem value="">Select</MenuItem>
                  {bloodGroups.map(group => (
                    <MenuItem key={group} value={group}>{group}</MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          )}

          {donationStep === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Weight (kg)"
                  name="weight"
                  type="number"
                  value={donationData.weight}
                  onChange={(e) => setDonationData({...donationData, weight: e.target.value})}
                  error={!!errors.weight}
                  helperText={errors.weight || "Minimum 50 kg required"}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Height (cm)"
                  name="height"
                  type="number"
                  value={donationData.height}
                  onChange={(e) => setDonationData({...donationData, height: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  Health History
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="hasTattoo"
                        checked={donationData.hasTattoo}
                        onChange={(e) => setDonationData({...donationData, hasTattoo: e.target.checked})}
                      />
                    }
                    label="Tattoo/Piercing in last 6 months"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="hasSurgery"
                        checked={donationData.hasSurgery}
                        onChange={(e) => setDonationData({...donationData, hasSurgery: e.target.checked})}
                      />
                    }
                    label="Surgery in last 6 months"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="hasDisease"
                        checked={donationData.hasDisease}
                        onChange={(e) => setDonationData({...donationData, hasDisease: e.target.checked})}
                      />
                    }
                    label="Any chronic diseases"
                  />
                </FormGroup>
              </Grid>
            </Grid>
          )}

          {donationStep === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Preferred Date"
                  name="preferredDate"
                  type="date"
                  value={donationData.preferredDate}
                  onChange={(e) => setDonationData({...donationData, preferredDate: e.target.value})}
                  error={!!errors.preferredDate}
                  helperText={errors.preferredDate}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Preferred Time"
                  name="preferredTime"
                  value={donationData.preferredTime}
                  onChange={(e) => setDonationData({...donationData, preferredTime: e.target.value})}
                >
                  <MenuItem value="09:00-11:00">09:00 AM - 11:00 AM</MenuItem>
                  <MenuItem value="11:00-13:00">11:00 AM - 01:00 PM</MenuItem>
                  <MenuItem value="14:00-16:00">02:00 PM - 04:00 PM</MenuItem>
                  <MenuItem value="16:00-18:00">04:00 PM - 06:00 PM</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Donation Center"
                  name="donationCenter"
                  value={donationData.donationCenter}
                  onChange={(e) => setDonationData({...donationData, donationCenter: e.target.value})}
                  error={!!errors.donationCenter}
                  helperText={errors.donationCenter}
                  required
                >
                  <MenuItem value="">Select Center</MenuItem>
                  {donationCenters.map(center => (
                    <MenuItem key={center} value={center}>{center}</MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          )}

          {donationStep === 3 && (
            <Box>
              <Alert severity="info" sx={{ mb: 3 }}>
                Please review your information before submitting.
              </Alert>
              
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Registration Summary</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}><strong>Name:</strong> {donationData.fullName}</Grid>
                    <Grid item xs={6}><strong>Blood Group:</strong> {donationData.bloodGroup}</Grid>
                    <Grid item xs={6}><strong>Phone:</strong> {donationData.phone}</Grid>
                    <Grid item xs={6}><strong>Date:</strong> {donationData.preferredDate}</Grid>
                    <Grid item xs={12}><strong>Center:</strong> {donationData.donationCenter}</Grid>
                  </Grid>
                </CardContent>
              </Card>
              
              <FormControl error={!!errors.termsAccepted} required>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="termsAccepted"
                        checked={donationData.termsAccepted}
                        onChange={(e) => setDonationData({...donationData, termsAccepted: e.target.checked})}
                      />
                    }
                    label="I confirm that all information provided is accurate and I meet the eligibility criteria for blood donation."
                  />
                </FormGroup>
              </FormControl>
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              onClick={() => donationStep === 0 ? setActiveTab('overview') : setDonationStep(prev => prev - 1)}
              startIcon={<ArrowBack />}
            >
              {donationStep === 0 ? 'Back to Overview' : 'Back'}
            </Button>
            
            <Button
              variant="contained"
              onClick={() => {
                if (donationStep === donationSteps.length - 1) {
                  setDonationSubmitted(true);
                } else {
                  setDonationStep(prev => prev + 1);
                }
              }}
              endIcon={donationStep === donationSteps.length - 1 ? <CheckCircle /> : <ArrowForward />}
            >
              {donationStep === donationSteps.length - 1 ? 'Submit Registration' : 'Next'}
            </Button>
          </Box>
        </Paper>

        {/* Eligibility Info Card */}
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocalHospital sx={{ mr: 1, color: '#d32f2f' }} />
              <Typography variant="h6">Eligibility Requirements</Typography>
            </Box>
            <Typography variant="body2">
              • Age: 18-65 years<br/>
              • Weight: Minimum 50 kg<br/>
              • Hemoglobin: Minimum 12.5 g/dL<br/>
              • No illnesses in the last 2 weeks<br/>
              • No tattoos/piercings in last 6 months<br/>
              • Not pregnant or breastfeeding
            </Typography>
          </CardContent>
        </Card>
      </>
    );
  };

  const renderRequest = () => {
    if (requestSubmitted) {
      return (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <CheckCircle sx={{ fontSize: 80, color: '#4caf50', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Request Submitted!
          </Typography>
          <Typography variant="body1" paragraph>
            Your blood request has been received. Our team will contact you shortly.
          </Typography>
          
          <Card variant="outlined" sx={{ mb: 3, textAlign: 'left' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Request Details</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}><strong>Request ID:</strong> BLD-{Date.now().toString().slice(-6)}</Grid>
                <Grid item xs={6}><strong>Status:</strong> <Chip label="Processing" color="warning" size="small" /></Grid>
                <Grid item xs={6}><strong>Blood Group:</strong> {requestData.requiredBloodGroup}</Grid>
                <Grid item xs={6}><strong>Quantity:</strong> {requestData.quantity} units</Grid>
                <Grid item xs={12}><strong>Contact:</strong> {requestData.contactPerson} - {requestData.phone}</Grid>
              </Grid>
            </CardContent>
          </Card>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              Our team will contact you within 30 minutes. For urgent requests, call: <strong>1800-123-4567</strong>
            </Typography>
          </Alert>
          
          <Button variant="contained" onClick={() => {
            setRequestSubmitted(false);
            setRequestData({
              requesterType: 'patient',
              hospitalName: '',
              patientName: '',
              contactPerson: '',
              email: '',
              phone: '',
              address: '',
              patientAge: '',
              patientGender: '',
              patientBloodGroup: '',
              diagnosis: '',
              urgency: 'normal',
              requiredBloodGroup: '',
              bloodType: 'Whole Blood',
              quantity: 1,
              requiredDate: '',
              requiredTime: '',
              specialRequirements: '',
              previousRequests: '',
            });
          }}>
            New Request
          </Button>
        </Paper>
      );
    }

    return (
      <>
        <Typography variant="h4" gutterBottom>Request Blood</Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          Fill out this form to request blood for patients. Emergency requests are prioritized.
        </Alert>

        <Paper sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel>Requester Type</FormLabel>
                <RadioGroup row name="requesterType" value={requestData.requesterType} 
                  onChange={(e) => setRequestData({...requestData, requesterType: e.target.value})}>
                  <FormControlLabel value="patient" control={<Radio />} label="Patient/Family" />
                  <FormControlLabel value="hospital" control={<Radio />} label="Hospital/Clinic" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {requestData.requesterType === 'hospital' && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Hospital/Clinic Name"
                  name="hospitalName"
                  value={requestData.hospitalName}
                  onChange={(e) => setRequestData({...requestData, hospitalName: e.target.value})}
                />
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Person Name"
                name="contactPerson"
                value={requestData.contactPerson}
                onChange={(e) => setRequestData({...requestData, contactPerson: e.target.value})}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={requestData.phone}
                onChange={(e) => setRequestData({...requestData, phone: e.target.value})}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Patient Information
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Patient Name"
                name="patientName"
                value={requestData.patientName}
                onChange={(e) => setRequestData({...requestData, patientName: e.target.value})}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Required Blood Group"
                name="requiredBloodGroup"
                value={requestData.requiredBloodGroup}
                onChange={(e) => setRequestData({...requestData, requiredBloodGroup: e.target.value})}
                required
              >
                <MenuItem value="">Select</MenuItem>
                {bloodGroups.map(group => (
                  <MenuItem key={group} value={group}>{group}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Quantity (Units)"
                name="quantity"
                type="number"
                value={requestData.quantity}
                onChange={(e) => setRequestData({...requestData, quantity: e.target.value})}
                required
                inputProps={{ min: 1 }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Urgency Level"
                name="urgency"
                value={requestData.urgency}
                onChange={(e) => setRequestData({...requestData, urgency: e.target.value})}
              >
                <MenuItem value="emergency">
                  <Chip label="Emergency (Immediate)" color="error" size="small" />
                </MenuItem>
                <MenuItem value="urgent">
                  <Chip label="Urgent (Within 4 hours)" color="warning" size="small" />
                </MenuItem>
                <MenuItem value="normal">
                  <Chip label="Normal (Within 24 hours)" color="info" size="small" />
                </MenuItem>
                <MenuItem value="planned">
                  <Chip label="Planned (Scheduled)" color="success" size="small" />
                </MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Required Date"
                name="requiredDate"
                type="date"
                value={requestData.requiredDate}
                onChange={(e) => setRequestData({...requestData, requiredDate: e.target.value})}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                <Button variant="outlined" onClick={() => setActiveTab('overview')}>
                  Cancel
                </Button>
                <Button 
                  variant="contained" 
                  color="error"
                  size="large"
                  startIcon={<Emergency />}
                  onClick={() => setRequestDialogOpen(true)}
                >
                  Submit Request
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Emergency Contact Card */}
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Emergency sx={{ mr: 1, color: '#f44336' }} />
              <Typography variant="h6">Emergency Contact</Typography>
            </Box>
            <Typography variant="h5" color="#f44336" gutterBottom>
              24/7 Helpline: 1800-123-4567
            </Typography>
            <Typography variant="body2" color="text.secondary">
              For immediate assistance, call our emergency hotline.
            </Typography>
          </CardContent>
        </Card>
      </>
    );
  };

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => navigate('/')}
              sx={{ mb: 2 }}
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
          <Box>
            <Button
              variant="contained"
              color="error"
              startIcon={<Emergency />}
              onClick={() => setActiveTab('request')}
              size="large"
            >
              Emergency Request
            </Button>
          </Box>
        </Box>

        {/* Navigation Tabs */}
        <Paper sx={{ mb: 3 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', overflowX: 'auto' }}>
              {[
                { key: 'overview', label: 'Overview', icon: <Bloodtype /> },
                { key: 'inventory', label: 'Blood Inventory', icon: <Inventory /> },
                { key: 'donors', label: 'Find Donors', icon: <People /> },
                { key: 'donate', label: 'Donate Blood', icon: <AddCircle /> },
                { key: 'request', label: 'Request Blood', icon: <Emergency /> },
              ].map((tab) => (
                <Button
                  key={tab.key}
                  sx={{ 
                    px: 3, 
                    py: 2,
                    borderRadius: 0,
                    borderBottom: activeTab === tab.key ? '3px solid #d32f2f' : 'none',
                    color: activeTab === tab.key ? '#d32f2f' : 'inherit',
                    fontWeight: activeTab === tab.key ? 'bold' : 'normal',
                  }}
                  startIcon={tab.icon}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </Button>
              ))}
            </Box>
          </Box>
        </Paper>

        {/* Main Content */}
        {renderContent()}
      </Box>

      {/* Donor Details Dialog */}
      <Dialog open={openDonorDialog} onClose={() => setOpenDonorDialog(false)} maxWidth="sm" fullWidth>
        {selectedDonor && (
          <>
            <DialogTitle>Donor Details</DialogTitle>
            <DialogContent>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Avatar sx={{ 
                  width: 80, 
                  height: 80, 
                  bgcolor: selectedDonor.avatarColor,
                  fontSize: 28,
                  mx: 'auto',
                  mb: 2
                }}>
                  {getInitials(selectedDonor.name)}
                </Avatar>
                <Typography variant="h5">{selectedDonor.name}</Typography>
                <Chip label={selectedDonor.bloodGroup} color="error" sx={{ mt: 1 }} />
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Age</Typography>
                  <Typography variant="body1">{selectedDonor.age} years</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Location</Typography>
                  <Typography variant="body1">{selectedDonor.location}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Phone</Typography>
                  <Typography variant="body1">{selectedDonor.phone}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Status</Typography>
                  <Chip
                    icon={getStatusIcon(selectedDonor.status)}
                    label={selectedDonor.status}
                    color={getStatusColor(selectedDonor.status)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Last Donation</Typography>
                  <Typography variant="body1">{selectedDonor.lastDonation}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Total Donations</Typography>
                  <Typography variant="body1">{selectedDonor.donations}</Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDonorDialog(false)}>Close</Button>
              <Button variant="contained" onClick={() => {
                alert(`Contacting ${selectedDonor.name}...`);
                setOpenDonorDialog(false);
              }}>
                Contact Donor
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Request Confirmation Dialog */}
      <Dialog open={requestDialogOpen} onClose={() => setRequestDialogOpen(false)}>
        <DialogTitle>Confirm Blood Request</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Are you sure you want to submit this blood request?
          </Typography>
          <Alert severity="info" sx={{ mt: 2 }}>
            Our team will contact you within 30 minutes to confirm.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRequestDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            color="error"
            onClick={() => {
              setRequestDialogOpen(false);
              setRequestSubmitted(true);
            }}
          >
            Confirm Request
          </Button>
        </DialogActions>
      </Dialog>

      {/* Footer */}
      <Box sx={{ 
        mt: 6, 
        pt: 3, 
        borderTop: 1, 
        borderColor: 'divider',
        bgcolor: 'background.paper',
        p: 3,
        borderRadius: 2
      }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Contact Information</Typography>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Phone sx={{ fontSize: 'small', mr: 1 }} /> 1800-123-4567
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Email sx={{ fontSize: 'small', mr: 1 }} /> bloodbank@arogyadwar.com
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOn sx={{ fontSize: 'small', mr: 1 }} /> Mumbai, India
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>Quick Links</Typography>
            <Button size="small" onClick={() => setActiveTab('donate')}>Become Donor</Button>
            <Button size="small" onClick={() => setActiveTab('request')}>Request Blood</Button>
            <Button size="small" onClick={() => setActiveTab('inventory')}>Check Stock</Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>Emergency</Typography>
            <Alert severity="error" icon={<Emergency />}>
              <Typography variant="body2">
                <strong>24/7 Emergency Helpline</strong><br/>
                Call: 108 or 102
              </Typography>
            </Alert>
          </Grid>
        </Grid>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3 }}>
          © {new Date().getFullYear()} Arogyadwar Blood Bank. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default BloodBankPage;
