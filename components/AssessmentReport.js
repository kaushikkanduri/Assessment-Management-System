const React = require('react');

// Main Assessment Report component
const AssessmentReport = ({ data }) => {
  return React.createElement(
    'div',
    { className: 'p-10 font-sans text-gray-900 text-base leading-relaxed' },
    React.createElement('h1', { className: 'text-3xl font-bold mb-6' }, data.assessmentName),
    ...data.sections.map((section, index) =>
      React.createElement(SectionRenderer, { key: index, section })
    )
  );
};

// Renders each section (e.g., Patient Info, Vitals, Exercise Performance)
const SectionRenderer = ({ section }) => {
  const isExerciseSection = section.title === 'Exercise Performance';

  return React.createElement(
    'div',
    { className: 'mb-8 section' },
    React.createElement('h2', { className: 'text-xl font-semibold mb-4' }, section.title),
    isExerciseSection
      ? section.fields.map((exercise, i) =>
          React.createElement(ExerciseCard, { key: i, exercise })
        )
      : React.createElement(
          'div',
          { className: 'grid grid-cols-2 gap-4' },
          section.fields.map((field, i) =>
            React.createElement(FieldCard, { key: i, field })
          )
        )
  );
};

// Field cards for non-exercise sections
const FieldCard = ({ field }) => {
  return React.createElement(
    'div',
    {
      className:
        'border border-gray-300 rounded-md p-4 bg-white shadow-sm exercise-card',
    },
    React.createElement(
      'h3',
      { className: 'text-md font-semibold mb-1 text-gray-800' },
      field.label
    ),
    React.createElement(
      'p',
      { className: 'text-lg font-bold text-gray-900' },
      `${field.value} ${field.unit || ''}`
    ),
    field.classification &&
      React.createElement(
        'p',
        { className: 'text-sm text-gray-600 mt-1' },
        `Status: ${field.classification}`
      )
  );
};

// Exercise performance cards
const ExerciseCard = ({ exercise }) => {
  return React.createElement(
    'div',
    {
      className:
        'border border-gray-300 rounded-md p-4 bg-white shadow-md mb-6 exercise-card',
    },
    React.createElement(
      'h3',
      { className: 'text-lg font-semibold text-gray-800 mb-1' },
      exercise.name
    ),
    exercise.analysisScore !== undefined &&
      React.createElement(
        'p',
        { className: 'text-sm text-gray-700 mb-1' },
        `Analysis Score: ${exercise.analysisScore}`
      ),
    React.createElement(
      'p',
      { className: 'text-sm text-gray-700 mb-1' },
      `Assigned Reps: ${exercise.assignReps}, Correct Reps: ${exercise.correctReps}`
    ),
    React.createElement(
      'p',
      { className: 'text-sm text-gray-700 mb-1' },
      `Time: ${exercise.time} seconds`
    ),
    exercise.classification &&
      React.createElement(
        'p',
        { className: 'text-sm text-gray-600 mb-2' },
        `Range: ${exercise.classification}`
      ),
    exercise.analysisList &&
      exercise.analysisList.length > 0 &&
      React.createElement(
        'div',
        { className: 'mb-2' },
        React.createElement(
          'p',
          { className: 'text-sm font-semibold text-gray-800' },
          'Analysis Observations:'
        ),
        React.createElement(
          'ul',
          { className: 'list-disc pl-5 text-sm text-gray-700' },
          exercise.analysisList.map((point, i) =>
            React.createElement('li', { key: i }, point)
          )
        )
      ),
    exercise.tipsList &&
      exercise.tipsList.length > 0 &&
      React.createElement(
        'div',
        null,
        React.createElement(
          'p',
          { className: 'text-sm font-semibold text-gray-800' },
          'Tips:'
        ),
        React.createElement(
          'ul',
          { className: 'list-disc pl-5 text-sm text-gray-700' },
          exercise.tipsList.map((tip, i) =>
            React.createElement('li', { key: i }, tip)
          )
        )
      )
  );
};

module.exports = AssessmentReport;
