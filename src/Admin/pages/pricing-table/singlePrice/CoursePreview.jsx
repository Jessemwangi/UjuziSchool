import React, { useState } from 'react';
import { useFetch } from '../../../../hooks/useFetch';
import { useParams } from 'react-router-dom';
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
} from '@mui/icons-material';


// Main component that takes API data as props
const CoursePreview = () => {
  const [selectedCourse, setSelectedCourse] = useState(0);
  const [expandedSection, setExpandedSection] = useState('overview');
   const {id} =useParams()

  const query = `?populate[courses][populate][courses_subcategories]=*&populate[courses][populate][courses_instructors]=*&populate[courses][populate][course_intro_video]=*&populate[courses][populate][course_intro_img]=*&populate[courses][populate][course_target_groups]=*&populate[courses][populate][course_learn_lists]=*&populate[courses][populate][course_qualification_equirements]=*&populate[courses][populate][course_reviews]=*&populate[courses][populate][courses_features]=*&populate[courses][populate][courses_weekly_curricula]=*&populate[courses][populate][course_ratings]=*&populate[courses][populate][questions]=*`
  const url =`/subscription-packages/${id}${query}`;
const { data, loading, error } = useFetch(url); 
  // Handle loading and error states
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-white text-2xl font-bold mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-400 mb-6">We couldn't load the course details. Please try again.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Extract package data from API response
  const packageData = data?.data?.attributes || {};
  const courses = packageData.courses?.data || [];
  const charges = packageData.charges?.data || [];

  // Transform API data to component format
  const transformedPackage = {
    id: data?.data?.id,
    packageName: packageData.packageName || "Course Package",
    duration: packageData.duration || "N/A",
    description: packageData.descritpion || packageData.description || "No description available",
    totalMaxUsers: packageData.totalMaxUsers || 0,
    charges: charges.map(charge => ({
      id: charge.id,
      name: charge.attributes.name,
      amount: charge.attributes.amount
    })),
    courses: courses.map(course => ({
      id: course.id,
      course_name: course.attributes.course_name,
      short_desc: course.attributes.short_desc,
      duration: course.attributes.duration,
      level: course.attributes.level,
      language: course.attributes.language || 'en',
      course_outline: course.attributes.course_outline,
      quizes: course.attributes.quizes,
      certificate: course.attributes.certificate,
      isActive: course.attributes.isActive
    }))
  };

  // Show message if no courses available
  if (!courses.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📚</div>
          <h2 className="text-white text-2xl font-bold mb-2">No Courses Available</h2>
          <p className="text-gray-400 mb-6">This package doesn't have any courses yet.</p>
        </div>
      </div>
    );
  }

  const mockModules = [
    {
      title: "Introduction to STEMEX",
      lessons: 6,
      duration: "2h 30m",
      completed: false,
      preview: true
    },
    {
      title: "Arduino Fundamentals",
      lessons: 8,
      duration: "3h 45m",
      completed: false,
      preview: true
    },
    {
      title: "Data Analysis with Excel",
      lessons: 10,
      duration: "4h 15m",
      completed: false,
      preview: false
    },
    {
      title: "Real-world Applications",
      lessons: 12,
      duration: "5h 30m",
      completed: false,
      preview: false
    }
  ];

  const totalAmount = transformedPackage.charges.reduce((sum, charge) => sum + charge.amount, 0);
  const currentCourse = transformedPackage.courses[selectedCourse];

  const features = [
    "Interactive video lessons with expert instructors",
    "Hands-on projects using Arduino and Excel",
    "Real-world problem-solving scenarios",
    "Comprehensive learning materials and resources",
    "Certificate of completion",
    "24/7 community support and discussion forums"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900/90 via-purple-900/90 to-pink-900/90">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <EmojiEvents className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-sm font-medium">{transformedPackage.packageName} Package</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                Master STEM Skills with 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"> Interactive Learning</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Unlock your potential with our comprehensive {transformedPackage.packageName} package featuring {transformedPackage.courses.length} expertly crafted courses designed for real-world application.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center text-gray-300">
                  <AccessTime className="w-5 h-5 mr-2 text-blue-400" />
                  <span>{transformedPackage.duration}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Group className="w-5 h-5 mr-2 text-green-400" />
                  <span>Up to {transformedPackage.totalMaxUsers} users</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Public className="w-5 h-5 mr-2 text-purple-400" />
                  <span>English</span>
                </div>
              </div>
              
              <button className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105">
                <PlayArrow className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Preview Course Content
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </button>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Package Pricing</h3>
                
                <div className="space-y-4 mb-6">
                  {transformedPackage.charges.map((charge) => (
                    <div key={charge.id} className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-gray-300">{charge.name}</span>
                      <span className={`font-semibold ${charge.amount < 0 ? 'text-green-400' : 'text-white'}`}>
                        {charge.amount < 0 ? '-' : ''}${Math.abs(charge.amount)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center text-2xl font-bold text-white pt-4 border-t border-white/20">
                  <span>Total</span>
                  <span className="text-cyan-400">${totalAmount}</span>
                </div>
                
                <button className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-green-500/25">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Selection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Included Courses ({transformedPackage.courses.length})
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {transformedPackage.courses.map((course, index) => (
            <div
              key={course.id}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${
                selectedCourse === index
                  ? 'border-cyan-400 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 shadow-xl shadow-cyan-500/20'
                  : 'border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800/70'
              }`}
              onClick={() => setSelectedCourse(index)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {course.course_name}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center">
                      <AccessTime className="w-4 h-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <TrackChanges className="w-4 h-4 mr-1" />
                      {course.level}
                    </div>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedCourse === index ? 'border-cyan-400 bg-cyan-400' : 'border-gray-600'
                }`}>
                  {selectedCourse === index && <CheckCircle className="w-4 h-4 text-white" />}
                </div>
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed">
                {course.short_desc.substring(0, 150)}...
              </p>
            </div>
          ))}
        </div>

        {/* Course Details */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 overflow-hidden">
          <div className="flex border-b border-gray-700">
            {['overview', 'curriculum', 'features'].map((tab) => (
              <button
                key={tab}
                className={`px-6 py-4 font-medium capitalize transition-colors ${
                  expandedSection === tab
                    ? 'text-cyan-400 border-b-2 border-cyan-400 bg-gray-800/50'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setExpandedSection(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-8">
            {expandedSection === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {currentCourse.course_name}
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {currentCourse.short_desc}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-6 rounded-xl border border-blue-500/20">
                    <CalendarToday className="w-8 h-8 text-blue-400 mb-3" />
                    <h4 className="text-lg font-semibold text-white mb-2">Duration</h4>
                    <p className="text-gray-300">{currentCourse.duration}</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20">
                    <TrackChanges className="w-8 h-8 text-purple-400 mb-3" />
                    <h4 className="text-lg font-semibold text-white mb-2">Level</h4>
                    <p className="text-gray-300">{currentCourse.level}</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-6 rounded-xl border border-green-500/20">
                    <Public className="w-8 h-8 text-green-400 mb-3" />
                    <h4 className="text-lg font-semibold text-white mb-2">Language</h4>
                    <p className="text-gray-300">English</p>
                  </div>
                </div>
              </div>
            )}

            {expandedSection === 'curriculum' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Course Curriculum</h3>
                <div className="space-y-4">
                  {mockModules.map((module, index) => (
                    <div key={index} className="bg-gray-900/50 rounded-xl border border-gray-700 overflow-hidden">
                      <div className="p-4 flex justify-between items-center">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg font-semibold text-white">{module.title}</h4>
                            {module.preview && (
                              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-medium rounded-full">
                                Preview Available
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span className="flex items-center">
                              <MenuBook className="w-4 h-4 mr-1" />
                              {module.lessons} lessons
                            </span>
                            <span className="flex items-center">
                              <AccessTime className="w-4 h-4 mr-1" />
                              {module.duration}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          {module.preview ? (
                            <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
                              <PlayArrow className="w-5 h-5" />
                            </button>
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center">
                              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {expandedSection === 'features' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">What You'll Get</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-lg rounded-2xl border border-cyan-500/20 p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Start Your Learning Journey?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of students who have transformed their STEM skills with our interactive courses. Get instant access to all content and start building your future today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105">
                Subscribe to {transformedPackage.packageName} Package
              </button>
              <button className="px-8 py-4 border border-gray-600 text-white font-semibold rounded-xl hover:border-gray-500 hover:bg-gray-800/50 transition-all duration-300">
                View All Packages
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;