import React, { useState } from 'react';
import { useFetch } from '../../../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Chip,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Alert,
} from '@mui/material';
import {
  PlayArrow,
  AccessTime,
  Group,
  CheckCircle,
  MenuBook,
  Public,
  EmojiEvents,
  TrackChanges,
  CalendarToday,
  ReportProblem,
  AddCircleOutline,
  RemoveCircleOutline,
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Updated light theme with the new primary color
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ba68c8', // New primary purple
    },
    secondary: {
      main: '#6366f1', // indigo-500
    },
    success: {
        main: '#16a34a', // green-600
    },
    error: {
        main: '#dc2626', // red-600
    },
    background: {
      default: '#f8fafc', // slate-50
      paper: '#ffffff', // white
    },
    text: {
      primary: '#1e293b', // slate-800
      secondary: '#64748b', // slate-500
    },
  },
  typography: {
    fontFamily: 'inherit',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          border: '1px solid #e2e8f0', // slate-200
        },
      },
    },
    MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          },
        },
      },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

const CoursePreview = () => {
  const [selectedCourse, setSelectedCourse] = useState(0);
  const [expandedSection, setExpandedSection] = useState('overview');
  const { id } = useParams();

  // Updated query to populate all necessary fields from the new data structure
  const query = `?populate[courses][populate][courses_features]=*&populate[courses][populate]
  [courses_weekly_curricula][populate][course_lessons]=*&populate[charges]=*`;
  const query2 =`?populate[courses][populate][courses_subcategories]=*&populate[courses][populate][courses_instructors]=*&populate[courses][populate]
  [course_intro_video]=*&populate[courses][populate][course_intro_img]=*&populate[courses][populate][course_target_groups]=*&populate[courses]
  [populate][course_learn_lists]=*&populate[courses][populate][course_qualification_equirements]=*&populate[courses][populate]
  [course_reviews]=*&populate[courses][populate]=courses_features&populate[courses][populate][courses_weekly_curricula][populate]=lesson_resources,
  lesson_quizzes&populate[courses][populate][course_ratings]=*&populate[courses][populate][questions]=*&populate[charges]=*`
  const url = `/subscription-packages/${id}${query}`;
  const { data, loading, error } = useFetch(url);

  const handleTabChange = (event, newValue) => {
    setExpandedSection(newValue);
  };

  const renderState = (title, message, icon) => (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', p: 3 }}>
      <Paper sx={{ textAlign: 'center', p: 6, maxWidth: '400px' }}>
        {icon}
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 2 }}>
          {title}
        </Typography>
        <Typography color="text.secondary">{message}</Typography>
        {error && (
            <Button variant="contained" sx={{ mt: 3 }} onClick={() => window.location.reload()}>
                Retry
            </Button>
        )}
      </Paper>
    </Box>
  );

  if (loading) {
    return renderState('Loading...', 'Please wait while we fetch the course details.', <CircularProgress size={48} />);
  }

  if (error || !data?.data) {
    return renderState('Oops! Something went wrong', "We couldn't load the course details.", <ReportProblem color="error" sx={{ fontSize: 48 }} />);
  }
  
  // Updated data transformation logic based on the provided sample
  const packageData = data.data.attributes;
  const courses = packageData.courses?.data || [];
  const charges = packageData.charges?.data || [];

  const transformedPackage = {
    id: data.data.id,
    packageName: packageData.packageName || "Course Package",
    duration: packageData.duration || "N/A",
    description: packageData.descritpion || "No description available",
    totalMaxUsers: packageData.totalMaxUsers || 0,
    charges: charges.map(charge => ({
      id: charge.id,
      name: charge.attributes.name,
      amount: charge.attributes.amount,
    })),
    courses: courses.map(course => ({
      id: course.id,
      ...course.attributes,
      // Map nested data arrays correctly
      courses_features: course.attributes.courses_features?.data || [],
      courses_weekly_curricula: course.attributes.courses_weekly_curricula?.data || [],
    })),
  };

  if (!transformedPackage.courses.length) {
    return renderState('No Courses Available', "This package doesn't have any courses yet.", <MenuBook color="primary" sx={{ fontSize: 48 }} />);
  }
  const totalAmount = transformedPackage.charges.reduce((sum, charge) => sum + charge.amount, 0);
  const currentCourse = transformedPackage.courses[selectedCourse];

  return (
    <ThemeProvider theme={lightTheme}>
      <Box sx={{ bgcolor: 'background.default' }}>
        {/* Hero Section */}
        <Box sx={{ bgcolor: 'background.paper', borderBottom: '1px solid #e2e8f0' }}>
          <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} lg={6}>
                <Chip
                  icon={<EmojiEvents />}
                  label={`${transformedPackage.packageName} Package`}
                  sx={{ mb: 3, fontWeight: 600 }}
                  color="primary"
                  variant='outlined'
                />
                <Typography variant="h2" component="h1" gutterBottom sx={{ color: 'text.primary' }}>
                  Master STEM Skills with{' '}
                  <Box component="span" sx={{ color: 'primary.main' }}>
                    Interactive Learning
                  </Box>
                </Typography>
                <Typography variant="h6" component="p" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.6 }}>
                  {transformedPackage.description}
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                  <Chip icon={<AccessTime />} label={transformedPackage.duration} />
                  <Chip icon={<Group />} label={`Up to ${transformedPackage.totalMaxUsers} users`} />
                  <Chip icon={<Public />} label="English" />
                </Stack>
                <Button variant="contained" size="large" startIcon={<PlayArrow />} sx={{ py: 1.5, px: 4 }}>
                  Preview Course Content
                </Button>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Card>
                  <CardContent sx={{ p: {xs: 3, md: 4} }}>
                    <Typography variant="h5" component="h3" sx={{ mb: 3 }}>Package Pricing</Typography>
                    <List disablePadding>
                      {transformedPackage.charges.map((charge) => (
                        <ListItem key={charge.id} disablePadding sx={{ py: 1.5, borderBottom: '1px solid #f1f5f9' }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            {charge.amount < 0 ? <RemoveCircleOutline color="success"/> : <AddCircleOutline color="error"/>}
                          </ListItemIcon>
                          <ListItemText primary={charge.name} />
                          <Typography fontWeight="bold" color={charge.amount < 0 ? 'success.main' : 'error.main'}>
                            {charge.amount < 0 ? '-' : '+'}${Math.abs(charge.amount)}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                    <Box display="flex" justifyContent="space-between" alignItems="center" borderTop="1px solid #e2e8f0" mt={2} pt={3}>
                      <Typography variant="h5">Total</Typography>
                      <Typography variant="h5" color="primary.main">${totalAmount}</Typography>
                    </Box>
                    <Button fullWidth variant="contained" size="large" sx={{ mt: 3, py: 1.5 }}>
                      Subscribe Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Course Selection & Details */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography variant="h3" component="h2" textAlign="center" sx={{ mb: 6 }}>
            Included Courses ({transformedPackage.courses.length})
          </Typography>
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {transformedPackage.courses.map((course, index) => (
              <Grid item xs={12} md={6} key={course.id}>
                <Card
                  onClick={() => setSelectedCourse(index)}
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    borderColor: selectedCourse === index ? 'primary.main' : 'transparent',
                    boxShadow: selectedCourse === index ? `0 0 0 2px ${lightTheme.palette.primary.main}` : '0 4px 12px rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease',
                    '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' },
                  }}
                >
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="start">
                        <Typography variant="h5" component="h3" sx={{ mb: 2, pr: 2 }}>{course.course_name}</Typography>
                        {selectedCourse === index && <CheckCircle color="primary" />}
                    </Box>
                    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                        <Chip icon={<AccessTime />} label={course.duration} size="small" />
                        <Chip icon={<TrackChanges />} label={course.level} size="small" />
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {course.short_desc?.substring(0, 150)}{course.short_desc?.length > 150 ? '...' : ''}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Course Details Tabs */}
          <Paper>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={expandedSection} onChange={handleTabChange} centered>
                <Tab label="Overview" value="overview" />
                <Tab label="Curriculum" value="curriculum" />
                <Tab label="Features" value="features" />
              </Tabs>
            </Box>
            <Box p={{xs: 3, md: 5}}>
              {expandedSection === 'overview' && (
                 <Box>
                 <Typography variant="h4" gutterBottom>{currentCourse.course_name}</Typography>
                 <Typography color="text.secondary" sx={{ mb: 4, lineHeight: 1.7 }}>{currentCourse.short_desc}</Typography>
                 <Grid container spacing={3}>
                     {[
                         {icon: <CalendarToday color="primary"/>, title: "Duration", value: currentCourse.duration},
                         {icon: <TrackChanges color="secondary"/>, title: "Level", value: currentCourse.level},
                         {icon: <Public sx={{color: '#10b981'}}/>, title: "Language", value: currentCourse.language || 'English'}
                     ].map(item => (
                       <Grid item xs={12} md={4} key={item.title}>
                           <Paper variant="outlined" sx={{ p: 3, textAlign: 'center', bgcolor: 'background.default' }}>
                               {item.icon}
                               <Typography variant="h6" sx={{mt: 1}}>{item.title}</Typography>
                               <Typography color="text.secondary">{item.value}</Typography>
                           </Paper>
                       </Grid>
                     ))}
                 </Grid>
               </Box>
              )}
              {expandedSection === 'curriculum' && (
                <Box>
                  <Typography variant="h4" sx={{ mb: 3 }}>Course Curriculum</Typography>
                  <Stack spacing={2}>
                    {currentCourse.courses_weekly_curricula.length > 0 ? (
                      currentCourse.courses_weekly_curricula.map((module) => (
                        <Paper key={module.id} variant="outlined" sx={{ p: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box>
                            <Typography variant="h6">{module.attributes.curriculum_title}</Typography>
                            <Stack direction="row" spacing={3} mt={1}>
                              <Chip icon={<MenuBook fontSize="small" />} label={`${module.attributes.course_lessons.data.length} lessons`} size="small" variant="outlined" />
                            </Stack>
                          </Box>
                        </Paper>
                      ))
                    ) : (
                      <Alert severity="info">Curriculum details are not available for this course yet.</Alert>
                    )}
                  </Stack>
                </Box>
              )}
              {expandedSection === 'features' && (
                <Box>
                  <Typography variant="h4" sx={{ mb: 3 }}>What You'll Get</Typography>
                  <List>
                    {currentCourse.courses_features.length > 0 ? (
                      currentCourse.courses_features.map((feature) => (
                        <ListItem key={feature.id} sx={{py: 1.5}}>
                          <ListItemIcon sx={{minWidth: '40px'}}><CheckCircle color="success" /></ListItemIcon>
                          <ListItemText primary={feature.attributes.course_features_name} />
                        </ListItem>
                      ))
                    ) : (
                      <Alert severity="info">No special features are listed for this course.</Alert>
                    )}
                  </List>
                </Box>
              )}
            </Box>
          </Paper>

          {/* CTA Section */}
          <Box mt={8} textAlign="center">
            <Paper sx={{ p: { xs: 4, md: 6 }, bgcolor: 'primary.main' }}>
              <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
                Ready to Start Your Learning Journey?
              </Typography>
              <Typography sx={{ maxWidth: '600px', mx: 'auto', mb: 4, color: 'rgba(255,255,255,0.9)' }}>
                Join thousands of students who have transformed their skills with our interactive courses. Get instant access to all content and start building your future today.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                <Button variant="contained" size="large" sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: '#f1f5f9' } }}>
                  Subscribe to {transformedPackage.packageName}
                </Button>
                <Button variant="outlined" size="large" sx={{ borderColor: 'white', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                  View All Packages
                </Button>
              </Stack>
            </Paper>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default CoursePreview;