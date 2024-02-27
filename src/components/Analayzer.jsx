import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Analayzer = () => {
  const { id } = useParams();
  const [impKey,setImpKey]=useState([]);
  const [impQ,setImpQ] = useState([])
// all_questions:{file1: Array(31), file2: Array(27)}
// exam_difficulty:{file1: 'medium', file2: 'medium'}
// imp_keywords:(41) ['features and application of python', 'Input and Output statements', 'arithmetic operations', 'if and if-else statement', 'while loop', 'loop concept', 'Set in Python', 'Dictionary in Python', 'assignment operators', 'if-elif-else statement', 'break, continue and pass statement', 'creating patterns using loop', 'creating a user-defined module', 'random module of Python', 'built-in functions of Python', 'user-defined function', 'math module of Python', 'file handling basic Python function', 'access string elements using index operator', 'read text file and count occurrences of each alphabet', 'usage of given file handling methods', 'usage of given string methods', 'control statements in Python', 'printing pattern', 'string functions', 'finding number of occurrences in list', 'append() and extend() methods of list', 'automated censor program', 'if-else and nested if-else syntax', 'basic tuple operations', 'randomly filling 0s and 1s into a 4x4 2-dimensional list', 'addition and modification of existing item of dictionary', 'matching statements with output', 'printing Fibonacci sequence using recursion', 'advantages of function in Python', 'creation of user-defined module and importing procedure', 'functions (math.exp(), math.floor(), math.pow())', 'plotting sine wave using matplotlib', 'various file accessing modes', 'functions for writing to file operation', 'string functions (endswith(), find())']
// imp_qa:(27) ['Explain if-elif-else control structure in Python.', 'Explain type casting in Python.', 'Explain features of Python programming language.', 'Write a program to calculate simple and compound interest.', 'Explain for loop with example.', 'Write a program to find the sum of following series.', 'Write a program that find whether a given year is a leap year or not.', 'List out different types of control statements in Python and explain any one.', 'Write a program to print following pattern.', 'Explain below string functions.', 'Write a program to find the number of times an element occurs in the list.', 'Differentiate between append() and extend() methods of list.', 'Write an automated censor program that reads the t… of the four-letter words have been replaced by .', 'Write syntax of if-else and nested if-else.', 'Explain basic tuple operations with example.', 'Write a program to randomly fill in 0s and 1s into… the rows and columns with the most number of 1s.', 'Explain addition of an item and modification of existing item of dictionary with example.', 'For the given set A{1,2,3,4,5} and B{10,2,3,4,50} match following statement with output.', 'Write a program to print Fibonacci sequence up to n numbers using recursion.', 'List out functions of datetime module.', 'Write advantages of function in Python.', 'Explain the creation of user defined module and pr…edure to import it in other program with example.', 'Explain following functions.', 'Write a program to plot sine wave using matplotlib.', 'List out various file accessing modes and explain each of them.', 'List out functions for writing to file operation and explain each.', 'Explain following string functions with example.']
// topic_frequency:{high: Array(16), less: Array(23)}



  useEffect(async () => {
    console.log(id);
    const data = await fetch(`http://localhost:8000/api/v1/pyq/getParamsData`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json' // Specify content type as JSON
      },
      body: JSON.stringify({
        params: id // Stringify the object before sending
      })
    });
    
    const dataJson = await data.json();
    const analayzedData = await JSON.parse(dataJson.data.data)
    console.log(analayzedData);
    setImpKey(analayzedData.imp_keywords)
    setImpQ(analayzedData.imp_qa)
  }, [id]); // Add id to dependency array to re-run effect when id changes

  return (
    <div>
      <div>
        {
          impKey.map(q=>(
            <div>{q}</div>
          ))
        }
      </div>
    </div>
    );
};

export default Analayzer;
