export const getStoredCourseData = () => {
    const data = localStorage.getItem('courseData');
    return data ? JSON.parse(data) : {};
  };
  
  export const setStoredCourseData = (newData:any) => {
    const currentData = getStoredCourseData();
    const mergedData = { ...currentData, ...newData };
    localStorage.setItem('courseData', JSON.stringify(mergedData));
  };
  
  export const clearStoredCourseData = () => {
    localStorage.removeItem('courseData');
  };