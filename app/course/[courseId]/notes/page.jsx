"use client";
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function ViewNotes() {
  const { courseId } = useParams();
  const [notes, setNotes] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const route = useRouter();

  // Fetch notes data from the server
  useEffect(() => {
    GetNotes();
  }, []);

  const GetNotes = async () => {
    const result = await axios.post('/api/study-type', {
      courseId: courseId,
      studyType: 'notes',
    });

    console.log(result?.data);
    setNotes(result?.data);
  };

  // Clean the HTML to remove unwanted characters like newlines
  const cleanHtml = (html) => {
    // Remove unwanted newlines and extra spaces, trim HTML entities
    return html.replace(/\n/g, '').replace(/```html/g, '').trim();
  };

  return notes && (
    <div>
      <div className='flex gap-5 items-center'>
        {stepCount !== 0 && (
          <Button variant="outline" size="sm" onClick={() => setStepCount(stepCount - 1)}>
            Previous
          </Button>
        )}
        {notes?.map((item, index) => (
          <div key={index} className={`w-full h-2 rounded-full ${index < stepCount ? 'bg-primary' : 'bg-gray-200'}`} />
        ))}
        <Button variant="outline" size="sm" onClick={() => setStepCount(stepCount + 1)}>
          Next
        </Button>
      </div>

      <div>
        {/* Clean HTML content before rendering */}
        <div dangerouslySetInnerHTML={{ __html: cleanHtml(notes[stepCount]?.notes || '') }} />

        {notes?.length === stepCount && (
          <div className='flex items-center gap-10 flex-col justify-center'>
            <h2>End of Notes</h2>
            <Button onClick={() => route.back()}>Go to Course Page</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewNotes;
