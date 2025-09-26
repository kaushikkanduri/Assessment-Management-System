import * as data from '../data.js';
import * as structuredRecord from './structuredRecord.js';
import * as classifications from './classifications.js';


function getValueByPath(obj, path) {
  try {
    return path.split('.').reduce((acc, key) => acc && acc[key], obj);
  } catch (error) {
    return 'N/A';
  }
}

function classify(value, rules) {
  if (!rules || value === 'N/A') return null;

  const num = parseFloat(value);
  if (isNaN(num)) return null;
  const rule = rules.find(r => num >= r.min && num < r.max);
  return rule ? rule.label : null;
}

export const mapData = (sessionId,next)=>{
  const sessionData = data[sessionId];
  console.log("Available sessions:", Object.keys(data));
  console.log("Requested sessionId:", sessionId);
  if (!sessionData) next(new Error(`No session found for id: ${sessionId}`));

  const record = structuredRecord[sessionData.assessment_id];
  if (!record) next(new Error(`No record found for assessment_id: ${sessionData.assessment_id}`));

  const result = [];

  record.sections.forEach(section => {
    if (section.dynamic === "exercises") {
      result.push({
        title: "Exercise Performance",
        fields: sessionData.exercises.map(ex => ({
          name: ex.name,
          analysisScore: ex.analysisScore,
          classification: classify(ex.analysisScore, classifications.exerciseScore),
          assignReps: ex.assignReps,
          correctReps: ex.correctReps,
          time: ex.setList[0]?.time || null,
          analysisList: ex.analysisList,
          tipsList: ex.tipsList
        }))
      });
    } else {
      result.push({
        title: section.title,
        fields: section.fields.map(field => {
          const value = getValueByPath(sessionData, field.path);
          const classification = field.classification
            ? classify(value, classifications[field.classification])
            : null;

          return {
            label: field.label,
            value,
            unit: field.unit,
            classification
          };
        })
      });
    }
  });

  return {
    session_id: sessionData.session_id,
    assessmentName: record.assessmentName,
    sections: result
  };
}

