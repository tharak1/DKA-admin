// import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
// import React, { useState, useEffect } from 'react';
// import { db } from '../../../firebase_config';
// import NotificationModal from './NotificationModal';
// import { useNavigate } from 'react-router-dom';
// import { useAppDispatch } from '../../../redux/PersistanceStorage';
// import { fetchOnlineExamResults, selectOnlineExamResults } from '../../../redux/ExamReportsSlice';
// import { useSelector } from 'react-redux';

// interface SideBarForEvaluationProps {
//     stuSubmission: UploadQuestionPaperPerformance;
//     QpId: string;
//     noOfQuestions: number;
//     course:string;
// }

// const SideBarForEvaluation: React.FC<SideBarForEvaluationProps> = ({ stuSubmission, QpId, noOfQuestions,course }) => {
//     const [marks, setMarks] = useState<number[]>(new Array<number>(noOfQuestions).fill(0));
//     const [totalMarks, setTotalMarks] = useState<number>(0);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [IsOpen, setIsOpen] = useState<boolean>(false);
//     const [examReport,setExamReport] = useState<ExamDetails>();
//     const navigate = useNavigate();
//     const dispatch = useAppDispatch();
//     const examReports = useSelector(selectOnlineExamResults);
//     const [regStuCourse,setRegStuCourse] = useState<regStuByCourse>();

//     const open = () => {
//         setIsOpen(true);
//     }

//     const close = async() =>{
//         setIsOpen(false);

//         console.log('====================================');
//         console.log(examReport);
//         console.log('====================================');

//         navigate('/admin/online_exam_viewport', { state: { examDetails:examReport,regStu:regStuCourse } ,replace:true});
//     }


//     console.log(noOfQuestions);

//     const handleMarksChange = (index: number, value: number) => {
//         const updatedMarks = [...marks];
//         updatedMarks[index] = isNaN(value) ? 0 : value;
//         setMarks(updatedMarks);
//     };

//     useEffect(() => {
//         const total = marks.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
//         setTotalMarks(total);
//     }, [marks]);

//     const handleSubmit = async () => {
//         setLoading(true);
//         try {
//             const docRef = doc(db, "Online-exam-results", QpId);
//             const docSnap = await getDoc(docRef);

//             if (docSnap.exists()) {
//                 const students = docSnap.data().students;
//                 const updatedStudents = students.map((student: any) => {
//                     if (student.studentId === stuSubmission.studentId) {
//                         return {
//                             ...student,
//                             marksObtained: totalMarks,
//                             evaluated: true
//                         };
//                     }
//                     return student;
//                 });

//                 await updateDoc(docRef, {
//                     students: updatedStudents
//                 });

//                 await dispatch(fetchOnlineExamResults(course));



//                 const regStuCourseSnapshot = await getDocs(query(collection(db, "regStuByCourse"),where("courseName","==",course)));


//                 // Extract the document data
//                 const regStuByCourse = regStuCourseSnapshot.docs.map((doc: any) => ({
//                   courseName: doc.data().courseName,
//                   students: doc.data().students
//                 }));
              
//                 setRegStuCourse(regStuByCourse[0]);


//                 setExamReport(examReports.find((x:ExamDetails)=>x.id === QpId));

//                 console.log("Marks updated successfully!");
//                 setLoading(false);
//                 open();
//             } else {
//                 console.log("Document not found!");
//             }
//         } catch (error) {
//             console.error("Error updating marks:", error);
//         }
//     };

//     return (
//         <div className='w-full h-full z-10 grid grid-cols-1 grid-rows-10 bg-white border-l-2 dark:bg-slate-900'>
//             <div className="col-span-1 row-span-2 w-full h-full shadow-md flex flex-col justify-start max-sm:justify-end p-5">
//                 <h2>{stuSubmission.studentName}</h2>
//                 <h2>{stuSubmission.studentId}</h2>
//                 <div>
//                     <strong>Total Marks: {totalMarks}</strong>
//                 </div>
//             </div>
//             <div className='col-span-1 row-span-7 overflow-auto flex flex-col justify-start px-2'>
//                 <h2>Enter marks for each question:</h2>
//                 {Array.from({ length: noOfQuestions }, (_, index) => (
//                     <div key={index} className="flex flex-col items-start space-x-2 mb-2">
//                         <label htmlFor={`question-${index + 1}`} className='ml-2'>{`Question ${index + 1}:`}</label>
//                         <input
//                             type="number"
//                             id={`question-${index + 1}`}
//                             value={marks[index] === 0 ? '' : marks[index]}
//                             onChange={(e) => handleMarksChange(index, parseInt(e.target.value) || 0)}
//                             className="border border-gray-300 rounded-md px-2 py-1 dark:bg-slate-600 dark:text-gray-200"
//                         />
//                     </div>
//                 ))}
//             </div>
//             <div className='col-span-1 row-span-1 flex flow-row justify-center h-full w-full items-center border-t-2'>
//                 <button className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg' onClick={handleSubmit}>
//                    {
//                     loading ? (
//                         <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
//                             <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
//                         </svg>
//                     ) :
//                     ("Submit")
//                    }
//                 </button>
//             </div>
//             <NotificationModal isOpen = {IsOpen} onClose={close} heading='Success' body='Marks assigned succesfully!!' type='none'/>
//         </div>
//     );
// };

// export default SideBarForEvaluation;
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase_config';
import NotificationModal from './NotificationModal';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/PersistanceStorage';
import { fetchOnlineExamResults, selectOnlineExamResults } from '../../../redux/ExamReportsSlice';
import { useSelector } from 'react-redux';
import { GetCourses } from '../../../redux/CourcesSlice';
import { CourseModel } from '../../../Models/CourceModel';

interface SideBarForEvaluationProps {
    stuSubmission: UploadQuestionPaperPerformance;
    QpId: string;
    noOfQuestions: number;
    course: string;
}


const SideBarForEvaluation: React.FC<SideBarForEvaluationProps> = ({ stuSubmission, QpId, noOfQuestions, course }) => {
    const [marks, setMarks] = useState<number[]>(new Array<number>(noOfQuestions).fill(0));
    const [totalMarks, setTotalMarks] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [IsOpen, setIsOpen] = useState<boolean>(false);
    const [examReport, setExamReport] = useState<ExamDetails>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const examReports = useSelector(selectOnlineExamResults);
    const [regStuCourse, setRegStuCourse] = useState<regStuByCourse>();
    const courses = useSelector(GetCourses) as CourseModel[];


    const open = () => {
        setIsOpen(true);
    };

    const close = async () => {
        setIsOpen(false);
        console.log('====================================');
        console.log(examReport);
        console.log('====================================');
        navigate('/admin/online_exam_viewport', { state: { examDetails: examReport, regStu: regStuCourse }, replace: true });
    };

    useEffect(() => {
        const total = marks.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        setTotalMarks(total);
    }, [marks]);

    useEffect(() => {
        const updatedExamReport = examReports.find((x: ExamDetails) => x.id === QpId);
        setExamReport(updatedExamReport);
    }, [examReports, QpId]);

    const handleMarksChange = (index: number, value: number) => {
        const updatedMarks = [...marks];
        updatedMarks[index] = isNaN(value) ? 0 : value;
        setMarks(updatedMarks);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const docRef = doc(db, "Online-exam-results", QpId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const students = docSnap.data().students;
                const updatedStudents = students.map((student: any) => {
                    if (student.studentId === stuSubmission.studentId) {
                        return {
                            ...student,
                            marksObtained: totalMarks,
                            evaluated: true
                        };
                    }
                    return student;
                });

                await updateDoc(docRef, { students: updatedStudents });
                await dispatch(fetchOnlineExamResults(course));

                const courseId = courses.find((coursess:CourseModel) => coursess.courseName === course)?.id
                
                // const regStuCourseSnapshot = await getDocs(query(collection(db, "regStuByCourse"), where("courseName", "==", course)));
                // const regStuByCourse = regStuCourseSnapshot.docs.map((doc: any) => ({
                //     courseName: doc.data().courseName,
                //     students: doc.data().students
                // }));

                const regstu =await getDoc(doc(db,"regStuByCourse",courseId!));

                setRegStuCourse( regstu.data() as regStuByCourse );

                console.log("Marks updated successfully!");
                setLoading(false);
                open();
            } else {
                console.log("Document not found!");
            }
        } catch (error) {
            console.error("Error updating marks:", error);
        }
    };

    return (
        <div className='w-full h-full z-10 grid grid-cols-1 grid-rows-10 bg-white border-l-2 dark:bg-slate-900'>
            <div className="col-span-1 row-span-2 w-full h-full shadow-md flex flex-col justify-start max-sm:justify-end p-5">
                <h2>{stuSubmission.studentName}</h2>
                <h2>{stuSubmission.studentId}</h2>
                <div>
                    <strong>Total Marks: {totalMarks}</strong>
                </div>
            </div>
            <div className='col-span-1 row-span-7 overflow-auto flex flex-col justify-start px-2'>
                <h2>Enter marks for each question:</h2>
                {Array.from({ length: noOfQuestions }, (_, index) => (
                    <div key={index} className="flex flex-col items-start space-x-2 mb-2">
                        <label htmlFor={`question-${index + 1}`} className='ml-2'>{`Question ${index + 1}:`}</label>
                        <input
                            type="number"
                            id={`question-${index + 1}`}
                            value={marks[index] === 0 ? '' : marks[index]}
                            onChange={(e) => handleMarksChange(index, parseInt(e.target.value) || 0)}
                            className="border border-gray-300 rounded-md px-2 py-1 dark:bg-slate-600 dark:text-gray-200"
                        />
                    </div>
                ))}
            </div>
            <div className='col-span-1 row-span-1 flex flow-row justify-center h-full w-full items-center border-t-2'>
                <button className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg' onClick={handleSubmit}>
                    {
                        loading ? (
                            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        ) :
                            ("Submit")
                    }
                </button>
            </div>
            <NotificationModal isOpen={IsOpen} onClose={close} heading='Success' body='Marks assigned succesfully!!' type='none' />
        </div>
    );
};

export default SideBarForEvaluation;
