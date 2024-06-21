

export const transformCourseData = (fullCourseData: any,userId: string | number) => {
    return {
      title: fullCourseData.courseTitle,
      description: fullCourseData.description || '',
      thumbnail: fullCourseData.courseThumbnail || '',
      instructorRef: userId,
      categoryRef: fullCourseData.category,
      pricing: {
        type: fullCourseData.pricingType,
        amount: fullCourseData.price 
      },
      attachments: fullCourseData.resources || '',
      lessons: fullCourseData.sections?.map((section: any) => ({
        title: section.title,
        subLessons: section.subLessons.map((subLesson: any) => ({
            title: subLesson.title,
            description: subLesson.description,
            video: subLesson.videoUrl
          }))
      })),
      trial: {
        title: fullCourseData.courseTitle,
        description: fullCourseData.whatYouWillLearn,
        thumbnail: fullCourseData.courseThumbnail,
        video: fullCourseData.courseTrailer
      }
    };
  };
  

  
export const transformUpdatedCourseData = (fullCourseData: any,userId: string | number) => {
  return {
    title: fullCourseData.courseTitle,
    description: fullCourseData.description || '',
    thumbnail: fullCourseData.courseThumbnail || '',
    instructorRef: userId,
    categoryRef: fullCourseData.category,
    pricing: {
      type: fullCourseData.pricingType,
      amount: fullCourseData.price 
    },
    attachments: fullCourseData.resources || '',
    lessons: fullCourseData.sections?.map((section: any) => ({
      title: section.title,
      subLessons: section.subLessons.map((subLesson: any) => ({
          title: subLesson.title,
          description: subLesson.description,
          video: subLesson.video
        }))
    })),
    trial: {
      title: fullCourseData.courseTitle,
      description: fullCourseData.whatYouWillLearn,
      thumbnail: fullCourseData.courseThumbnail,
      video: fullCourseData.courseTrailer
    }
  };
};
