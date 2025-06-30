import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addQuestion } from '../slice/quizSlices';
import { z } from 'zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// zod schema
const schema = z.object({
  questions: z.array(
    z.object({
      question: z.string().min(1, 'Question is required'),
      options: z.array(z.string().min(1)).length(4),
      correctAnswer: z.string().min(1, 'Correct answer is required'),
    })
  ),
});



type FormData = z.infer<typeof schema>;

interface AddQuestionFormProps {
  onClose: () => void;
}

const AddQuestionForm: React.FC<AddQuestionFormProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      questions: [
        { question: '', 
          options: ['', '', '', ''], 
          correctAnswer: '' },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const onSubmit = (data: FormData) => {
    for (const q of data.questions) {
      if (!q.options.includes(q.correctAnswer)) {
        alert(`Correct answer must be one of the options for: "${q.question}"`);
        return;
      }
    }
    dispatch(addQuestion(data.questions))
    setShowSuccess(true);
    reset();
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, onClose]);

  return (
    <div className="max-w-full mx-auto mt-8 p-6 bg-white shadow rounded">
     <h2 className="text-xl font-bold mb-4 text-black">➕Add Questions</h2>

      {showSuccess && (
        <div className="mb-4 text-green-700 bg-green-100 border border-green-300 rounded p-3">
          ✅ Questions added successfully!
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <table className="min-w-full border border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Question</th>
              <th className="border p-2">Option 1</th>
              <th className="border p-2">Option 2</th>
              <th className="border p-2">Option 3</th>
              <th className="border p-2">Option 4</th>
              <th className="border p-2">Correct</th>
              <th className="border p-2">🗑</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr key={field.id}>
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2">
                  <input className="w-full border p-1"
                   {...register(`questions.${index}.question`)} 
                   placeholder="Enter question" />
                  {errors.questions?.[index]?.question && <p className="text-red-500 text-sm">{errors.questions[index]?.question?.message}</p>}
                </td>
                {[0, 1, 2, 3].map((optIdx) => (
                  <td key={optIdx} className="border p-2">
                    <input className="w-full border p-1"
                     {...register(`questions.${index}.options.${optIdx}`)}
                      placeholder={`Option ${optIdx + 1}`} />
                    {errors.questions?.[index]?.options?.[optIdx] && <p className="text-red-500 text-sm">{errors.questions[index]?.options?.[optIdx]?.message}</p>}
                  </td>
                ))}
                <td className="border p-2">
                  <input className="w-full border p-1"
                   {...register(`questions.${index}.correctAnswer`)}
                    placeholder="Correct answer" />
                  {errors.questions?.[index]?.correctAnswer && <p className="text-red-500 text-sm">{errors.questions[index]?.correctAnswer?.message}</p>}
                </td>
                <td className="border p-2 text-center">
                  <button type="button" onClick={() => remove(index)} className="bg-red-500 text-black px-2 py-1 rounded">❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mt-4">
          <button type="button" onClick={() => append({ question: '', options: ['', '', '', ''], correctAnswer: '' })} className="bg-blue-500 text-black px-4 py-2 rounded">➕ Add Questions</button>
          <button type="submit" className="bg-green-600 text-black px-4 py-2 rounded">✅ Submit All</button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestionForm;
