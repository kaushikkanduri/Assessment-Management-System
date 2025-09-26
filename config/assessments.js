module.exports = {
  "as_hr_02": {
    "assessmentName": "Health & Fitness Assessment",
    "sections": [
      {
        "title": "Patient Info",
        "fields": [
          { "label": "Gender", "path": "gender", "unit": "" },
          { "label": "Height", "path": "height", "unit": "cm" },
          { "label": "Weight", "path": "weight", "unit": "kg" },
          { "label": "Age", "path": "bodyCompositionData.Age", "unit": "years" }
        ]
      },
      {
        "title": "Key Body Vitals",
        "fields": [
          { "label": "Heart Rate", "path": "vitalsMap.vitals.heart_rate", "unit": "bpm" },
          { "label": "Blood Pressure (Sys)", "path": "vitalsMap.vitals.bp_sys", "unit": "mmHg" },
          { "label": "Blood Pressure (Dia)", "path": "vitalsMap.vitals.bp_dia", "unit": "mmHg" },
          { "label": "Oxygen Saturation", "path": "vitalsMap.vitals.oxy_sat_prcnt", "unit": "%" },
          { "label": "Respiratory Rate", "path": "vitalsMap.vitals.resp_rate", "unit": "bpm" }
        ]
      },
      {
        "title": "Body Composition",
        "fields": [
          { "label": "BMI", "path": "bodyCompositionData.BMI", "unit": "", "classification": "bmi" },
          { "label": "Body Fat %", "path": "bodyCompositionData.BFC", "unit": "%" },
          { "label": "Lean Mass", "path": "bodyCompositionData.LM", "unit": "kg" },
          { "label": "Fat Mass", "path": "bodyCompositionData.FM", "unit": "kg" },
          { "label": "BMR", "path": "bodyCompositionData.BMR", "unit": "kcal" },
          { "label": "Waist-Hip Ratio", "path": "bodyCompositionData.WHR", "unit": "" }
        ]
      },
      {
        "title": "Wellness & Risk",
        "fields": [
          { "label": "Wellness Score", "path": "vitalsMap.wellness_score", "unit": "", "classification": "wellness" },
          { "label": "Health Risk Score", "path": "vitalsMap.health_risk_score", "unit": "", "classification": "risk" },
          { "label": "Stress Index", "path": "vitalsMap.metadata.heart_scores.stress_index", "unit": "" },
          { "label": "VO₂ Max", "path": "vitalsMap.metadata.physiological_scores.vo2max", "unit": "mL/kg/min" }
        ]
      },
      {
        "title": "Cardiovascular Metrics",
        "fields": [
          { "label": "Cardiac Output", "path": "vitalsMap.metadata.cardiovascular.cardiac_out", "unit": "L/min" },
          { "label": "Mean Arterial Pressure", "path": "vitalsMap.metadata.cardiovascular.map", "unit": "mmHg" },
          { "label": "PRQ", "path": "vitalsMap.metadata.cardiovascular.prq", "unit": "" },
          { "label": "HR Max", "path": "vitalsMap.metadata.heart_scores.HRMax", "unit": "bpm" },
          { "label": "Heart Rate Reserve", "path": "vitalsMap.metadata.heart_scores.HRR", "unit": "bpm" }
        ]
      },
      {
        "title": "Exercise Performance",
        "dynamic": "exercises"
      }
    ]
  },
  "as_card_01": {
    "assessmentName": "Cardiovascular Assessment",
    "sections": [
      {
        "title": "Patient Info",
        "fields": [
          { "label": "Gender", "path": "gender", "unit": "" },
          { "label": "Height", "path": "height", "unit": "cm" },
          { "label": "Weight", "path": "weight", "unit": "kg" }
        ]
      },
      {
        "title": "Vital Signs",
        "fields": [
          { "label": "Heart Rate", "path": "vitalsMap.vitals.heart_rate", "unit": "bpm" },
          { "label": "Blood Pressure (Sys)", "path": "vitalsMap.vitals.bp_sys", "unit": "mmHg" },
          { "label": "Blood Pressure (Dia)", "path": "vitalsMap.vitals.bp_dia", "unit": "mmHg" },
          { "label": "Oxygen Saturation", "path": "vitalsMap.vitals.oxy_sat_prcnt", "unit": "%" },
          { "label": "Respiratory Rate", "path": "vitalsMap.vitals.resp_rate", "unit": "bpm" }
        ]
      },
      {
        "title": "Body Metrics",
        "fields": [
          { "label": "BMI", "path": "bodyCompositionData.BMI", "unit": "", "classification": "bmi" },
          { "label": "VO₂ Max", "path": "vitalsMap.metadata.physiological_scores.vo2max", "unit": "mL/kg/min" },
          { "label": "Cardiac Output", "path": "vitalsMap.metadata.cardiovascular.cardiac_out", "unit": "L/min" },
          { "label": "Mean Arterial Pressure", "path": "vitalsMap.metadata.cardiovascular.map", "unit": "mmHg" }
        ]
      },
      {
        "title": "Heart Analysis",
        "fields": [
          { "label": "HR Max", "path": "vitalsMap.metadata.heart_scores.HRMax", "unit": "bpm" },
          { "label": "Heart Rate Reserve", "path": "vitalsMap.metadata.heart_scores.HRR", "unit": "bpm" },
          { "label": "Heart Rate Utilization", "path": "vitalsMap.metadata.heart_scores.heart_utilized", "unit": "%" },
          { "label": "Stress Index", "path": "vitalsMap.metadata.heart_scores.stress_index", "unit": "" }
        ]
      },
      {
        "title": "Exercise Performance",
        "dynamic": "exercises"
      }
    ]
  }
};
