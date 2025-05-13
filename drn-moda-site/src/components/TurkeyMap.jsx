'use client';

import { useEffect, useRef, useState } from 'react';

export default function TurkeyMap({ onProvinceHover }) {
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [activeProvinceCode, setActiveProvinceCode] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showFacilityDetail, setShowFacilityDetail] = useState(null);
  const [screenSize, setScreenSize] = useState('desktop');
  
  // Define positions for different screen sizes
  const responsivePositions = {
    desktop: {
      'istanbul-merkez': { top: '14%', left: '15%' },
      'istanbul-tesis': { top: '14%', left: '18%' },
      'tokat-tesis': { top: '25%', left: '58%' }
    },
    tablet: {
      'istanbul-merkez': { top: '15%', left: '14%' },
      'istanbul-tesis': { top: '15%', left: '17%' },
      'tokat-tesis': { top: '26%', left: '57%' }
    },
    mobile: {
      'istanbul-merkez': { top: '16%', left: '13%' },
      'istanbul-tesis': { top: '16%', left: '16%' },
      'tokat-tesis': { top: '27%', left: '56%' }
    }
  };
  
  // Facility data with responsive positions
  const facilities = {
    'istanbul-merkez': { 
      plateCode: '34',
      name: 'İstanbul Merkez', 
      type: 'Genel Merkez',
      description: 'Showroom ve Yönetim',
      tabId: 'istanbul-merkez',
      getPosition: () => responsivePositions[screenSize]['istanbul-merkez']
    },
    'istanbul-tesis': { 
      plateCode: '34',
      name: 'İstanbul Tesisi', 
      type: 'Kesimhane',
      description: 'Kesimhane',
      tabId: 'istanbul-kesimhane',
      getPosition: () => responsivePositions[screenSize]['istanbul-tesis']
    },
    'tokat-tesis': { 
      plateCode: '60',
      name: 'Tokat Erbaa Tesisi', 
      type: 'Üretim Tesisi',
      description: 'Üretim Tesisi',
      tabId: 'tokat',
      getPosition: () => responsivePositions[screenSize]['tokat-tesis']
    }
  };
  
  // Screen size detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };
    
    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Provinces with facilities
  const activeFacilities = [...new Set(Object.values(facilities).map(f => f.plateCode))];
  
  // This function will be called after the SVG is loaded
  const handleMapLoad = () => {
    setIsMapLoaded(true);
  };

  const handleMarkerClick = (facilityKey) => {
    // Toggle the facility detail if clicking the same marker again
    setShowFacilityDetail(prevState => prevState === facilityKey ? null : facilityKey);
    
    // Trigger the tab change in parent component
    const tabId = facilities[facilityKey]?.tabId;
    if (tabId && onProvinceHover) {
      onProvinceHover(tabId);
    }
  };
  
  // Effect to handle the SVG interaction after it's loaded
  useEffect(() => {
    if (!isMapLoaded || !mapRef.current) return;
    
    // Get the SVG document
    const svgDoc = mapRef.current.contentDocument;
    if (!svgDoc) return;
    
    // Add hover event listeners to all provinces
    const provinces = svgDoc.querySelectorAll('g[data-plate]');
    
    const handleMouseEnter = (plateCode) => {
      setActiveProvinceCode(plateCode);
      setShowInfo(true);
      
      // Find facility that matches the plate code
      const facilityKey = Object.keys(facilities).find(key => 
        facilities[key].plateCode === plateCode
      );
      
      if (facilityKey && facilities[facilityKey]?.tabId && onProvinceHover) {
        // Use the tabId to match with parent tabs
        const tabId = facilities[facilityKey].tabId;
        onProvinceHover(tabId);
      }
    };
    
    const handleMouseLeave = () => {
      setShowInfo(false);
    };
    
    provinces.forEach(province => {
      const plateCode = province.getAttribute('data-plate');
      if (!plateCode) return;
      
      // Add hover events
      province.addEventListener('mouseenter', () => handleMouseEnter(plateCode));
      province.addEventListener('mouseleave', handleMouseLeave);
      
      // Highlight provinces with facilities
      if (activeFacilities.includes(plateCode)) {
        province.classList.add('active');
        
        // Make active provinces more visible
        const paths = province.querySelectorAll('path');
        paths.forEach(path => {
          if (path) {
            path.style.fill = '#D0D0D0'; // Darker shade for better visibility
            path.style.stroke = '#C8A028';
            path.style.strokeWidth = '2'; // Thicker outline
            
            // Add filter if not already present
            const filterId = 'facility-glow';
            let filter = svgDoc.getElementById(filterId);
            
            if (!filter) {
              // Create a filter for glow effect
              const svgNS = 'http://www.w3.org/2000/svg';
              const defs = svgDoc.querySelector('defs') || svgDoc.createElementNS(svgNS, 'defs');
              
              if (!svgDoc.querySelector('defs')) {
                svgDoc.querySelector('svg').appendChild(defs);
              }
              
              filter = document.createElementNS(svgNS, 'filter');
              filter.setAttribute('id', filterId);
              filter.setAttribute('x', '-20%');
              filter.setAttribute('y', '-20%');
              filter.setAttribute('width', '140%');
              filter.setAttribute('height', '140%');
              
              const feGaussianBlur = document.createElementNS(svgNS, 'feGaussianBlur');
              feGaussianBlur.setAttribute('stdDeviation', '2');
              feGaussianBlur.setAttribute('result', 'blur');
              
              const feColorMatrix = document.createElementNS(svgNS, 'feColorMatrix');
              feColorMatrix.setAttribute('in', 'blur');
              feColorMatrix.setAttribute('type', 'matrix');
              feColorMatrix.setAttribute('values', '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7');
              feColorMatrix.setAttribute('result', 'glow');
              
              const feMerge = document.createElementNS(svgNS, 'feMerge');
              
              const feMergeNode1 = document.createElementNS(svgNS, 'feMergeNode');
              feMergeNode1.setAttribute('in', 'glow');
              
              const feMergeNode2 = document.createElementNS(svgNS, 'feMergeNode');
              feMergeNode2.setAttribute('in', 'SourceGraphic');
              
              feMerge.appendChild(feMergeNode1);
              feMerge.appendChild(feMergeNode2);
              
              filter.appendChild(feGaussianBlur);
              filter.appendChild(feColorMatrix);
              filter.appendChild(feMerge);
              
              defs.appendChild(filter);
            }
            
            // Apply the filter to the path instead of the province group
            path.style.filter = `url(#${filterId})`;
          }
        });
      }
    });
    
    // Add turkey-map class to the SVG for CSS targeting
    const svgElement = svgDoc.querySelector('svg');
    if (svgElement) {
      svgElement.classList.add('turkey-map');
      svgElement.style.maxWidth = '100%';
      svgElement.style.height = 'auto';
      svgElement.style.width = '100%';
      // Set proper viewBox to ensure the map is displayed correctly with all cities visible
      svgElement.setAttribute('viewBox', '0 0 1007.478 527.323');
    }
    
    // Cleanup function
    return () => {
      provinces.forEach(province => {
        const plateCode = province.getAttribute('data-plate');
        if (plateCode) {
          province.removeEventListener('mouseenter', () => handleMouseEnter(plateCode));
          province.removeEventListener('mouseleave', handleMouseLeave);
        }
      });
    };
  }, [isMapLoaded, onProvinceHover, facilities, activeFacilities]);

  return (
    <div className="turkey-map-container relative">
      <object
        ref={mapRef}
        data="/images/turkey-map.svg"
        type="image/svg+xml"
        className="w-full h-full"
        onLoad={handleMapLoad}
        aria-label="Türkiye Haritası"
      />
      
      {/* Facility Markers */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {Object.keys(facilities).map((facilityKey) => {
          const facility = facilities[facilityKey];
          if (!facility) return null;
          
          return (
            <div 
              key={facilityKey}
              className={`absolute facility-marker pointer-events-auto ${showFacilityDetail === facilityKey ? 'scale-125' : ''}`}
              style={{ 
                top: facility.getPosition()?.top || '0%', 
                left: facility.getPosition()?.left || '0%',
                transition: 'transform 0.3s ease',
                zIndex: 100
              }}
              onClick={() => handleMarkerClick(facilityKey)}
            >
              <div className={`marker-pulse ${facilityKey.includes('merkez') ? 'merkez-marker' : ''}`}>
                {showFacilityDetail === facilityKey && (
                  <span className="marker-label">
                    <span className="font-bold">{facility.name}</span>
                    <span className="block text-xs mt-1">{facility.type}</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Facility Info Overlay */}
      {showFacilityDetail && facilities[showFacilityDetail] && (
        <div className="absolute bottom-4 left-4 bg-white p-4 rounded shadow-lg max-w-xs z-[1000]">
          <h3 className="font-bold text-lg text-gray-800 border-b border-gray-200 pb-2 mb-2">
            {facilities[showFacilityDetail].name}
          </h3>
          <p className="text-sm text-gray-600 mb-2 font-medium">
            {facilities[showFacilityDetail].type}
          </p>
          <p className="text-xs flex items-start">
            <span className="text-[#C8A028] mr-2">•</span>
            <span className="text-gray-500">{facilities[showFacilityDetail].description}</span>
          </p>
        </div>
      )}
      
      <style jsx>{`
        .turkey-map-container {
          position: relative;
          width: 100%;
          height: 100%;
        }
        
        .facility-marker {
          cursor: pointer;
          z-index: 10;
          transform-origin: center;
        }
        
        .marker-pulse {
          width: 20px; /* Larger marker */
          height: 20px; /* Larger marker */
          background-color: #ffb300; /* Brighter gold */
          border-radius: 50%;
          position: relative;
          border: 3px solid white; /* Thicker border */
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.8); /* Stronger shadow */
          animation: pulse 2s infinite;
          transform: translate(-50%, -50%); /* Center the marker on its position */
          z-index: 200; /* Ensure markers are above all map elements */
        }
        
        .merkez-marker {
          background-color: #ff6600;  /* Even brighter orange */
          border: 3px solid white; /* Thicker border */
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.8); /* Stronger shadow */
          animation: merkez-pulse 2s infinite;
          width: 24px; /* Larger for headquarters */
          height: 24px; /* Larger for headquarters */
        }
        
        .marker-label {
          position: absolute;
          top: -45px;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          background-color: rgba(255, 255, 255, 0.95);
          color: #333;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
          border: 1.5px solid #C8A028;
          animation: fadeIn 0.3s ease-in-out;
          z-index: 1000;
          min-width: 120px;
          text-align: center;
          pointer-events: none; /* Ensure clicks go through labels */
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 179, 0, 1); /* Fully opaque pulse */
            transform: translate(-50%, -50%) scale(1);
          }
          70% {
            box-shadow: 0 0 0 18px rgba(255, 179, 0, 0); /* Larger pulse */
            transform: translate(-50%, -50%) scale(1.15); /* More noticeable size pulse */
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 179, 0, 0);
            transform: translate(-50%, -50%) scale(1);
          }
        }
        
        @keyframes merkez-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 102, 0, 1); /* Fully opaque pulse */
            transform: translate(-50%, -50%) scale(1);
          }
          70% {
            box-shadow: 0 0 0 18px rgba(255, 102, 0, 0); /* Larger pulse */
            transform: translate(-50%, -50%) scale(1.15); /* More noticeable size pulse */
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 102, 0, 0);
            transform: translate(-50%, -50%) scale(1);
          }
        }
        
        /* Responsive marker sizes */
        @media (max-width: 1023px) {
          .marker-pulse {
            width: 18px;
            height: 18px;
          }
          
          .merkez-marker {
            width: 22px;
            height: 22px;
          }
        }
        
        @media (max-width: 639px) {
          .marker-pulse {
            width: 16px;
            height: 16px;
            border-width: 2px;
          }
          
          .merkez-marker {
            width: 20px;
            height: 20px;
            border-width: 2px;
          }
          
          .marker-label {
            top: -40px;
            font-size: 11px;
            min-width: 100px;
            padding: 4px 8px;
          }
        }
      `}</style>
    </div>
  );
} 