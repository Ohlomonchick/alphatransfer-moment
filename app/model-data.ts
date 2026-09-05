export type ModelRow = {
  d: string;
  session: number;
  raw: number;
  probability: number;
  candidate: boolean;
  closingProbability: number;
  closing: boolean;
  ret1: number;
  ret5: number;
  pr60: number;
  vol20: number;
  rubPerKzt: number;
};

export const modelProfile = {
  configId: 'tabm_periodic_kzt_120m_s2_kztcal',
  model: 'TabM',
  policy: 'cadence85_cd2',
  nowThreshold: 0.173906096,
  closingThreshold: 0.435610593,
  cooldownSessions: 2,
} as const;

// Exact offline output of final_solution/final_sprint/predict.py joined with its input features.
// The UI never runs or approximates the model in the browser.
export const modelRows: ModelRow[] = [
  { d: '2026-05-01', session: 4031, raw: 0.100284, probability: 0.134758, candidate: false, closingProbability: 0.439338, closing: false, ret1: -0.010502, ret5: -0.000833, pr60: 0.591667, vol20: 0.013489, rubPerKzt: 0.162066 },
  { d: '2026-05-05', session: 4032, raw: 0.040515, probability: 0.069195, candidate: false, closingProbability: 0.324865, closing: false, ret1: 0.005538, ret5: -0.001263, pr60: 0.625000, vol20: 0.013598, rubPerKzt: 0.162966 },
  { d: '2026-05-06', session: 4033, raw: 0.186980, probability: 0.212882, candidate: true, closingProbability: 0.430706, closing: false, ret1: -0.004736, ret5: 0.007861, pr60: 0.591667, vol20: 0.013520, rubPerKzt: 0.162196 },
  { d: '2026-05-07', session: 4034, raw: 0.030770, probability: 0.056441, candidate: false, closingProbability: 0.313696, closing: false, ret1: -0.002630, ret5: -0.002026, pr60: 0.541667, vol20: 0.013286, rubPerKzt: 0.161770 },
  { d: '2026-05-08', session: 4035, raw: 0.053992, probability: 0.085526, candidate: false, closingProbability: 0.298296, closing: false, ret1: -0.004610, ret5: -0.016940, pr60: 0.458333, vol20: 0.013110, rubPerKzt: 0.161026 },
  { d: '2026-05-09', session: 4036, raw: 0.028609, probability: 0.053473, candidate: false, closingProbability: 0.350647, closing: false, ret1: -0.004363, ret5: -0.010801, pr60: 0.358333, vol20: 0.010192, rubPerKzt: 0.160325 },
  { d: '2026-05-13', session: 4037, raw: 0.073019, probability: 0.106783, candidate: false, closingProbability: 0.357782, closing: false, ret1: -0.002217, ret5: -0.018555, pr60: 0.325000, vol20: 0.009107, rubPerKzt: 0.159970 },
  { d: '2026-05-14', session: 4038, raw: 0.128156, probability: 0.161286, candidate: false, closingProbability: 0.464137, closing: false, ret1: -0.011790, ret5: -0.025609, pr60: 0.258333, vol20: 0.009391, rubPerKzt: 0.158095 },
  { d: '2026-05-15', session: 4039, raw: 0.023876, probability: 0.046747, candidate: false, closingProbability: 0.368270, closing: false, ret1: -0.010767, ret5: -0.033746, pr60: 0.175000, vol20: 0.009481, rubPerKzt: 0.156402 },
  { d: '2026-05-16', session: 4040, raw: 0.047445, probability: 0.077753, candidate: false, closingProbability: 0.386967, closing: false, ret1: -0.013764, ret5: -0.042900, pr60: 0.075000, vol20: 0.009563, rubPerKzt: 0.154264 },
  { d: '2026-05-19', session: 4041, raw: 0.043548, probability: 0.072987, candidate: false, closingProbability: 0.382910, closing: false, ret1: -0.002492, ret5: -0.041030, pr60: 0.025000, vol20: 0.008521, rubPerKzt: 0.153880 },
  { d: '2026-05-20', session: 4042, raw: 0.006971, probability: 0.018592, candidate: false, closingProbability: 0.308961, closing: false, ret1: -0.009199, ret5: -0.048012, pr60: 0.008333, vol20: 0.008484, rubPerKzt: 0.152471 },
  { d: '2026-05-21', session: 4043, raw: 0.206758, probability: 0.229302, candidate: true, closingProbability: 0.501254, closing: false, ret1: -0.014062, ret5: -0.050283, pr60: 0.008333, vol20: 0.008815, rubPerKzt: 0.150342 },
  { d: '2026-05-22', session: 4044, raw: 0.210755, probability: 0.232576, candidate: false, closingProbability: 0.524706, closing: false, ret1: -0.001931, ret5: -0.041448, pr60: 0.008333, vol20: 0.008726, rubPerKzt: 0.150052 },
  { d: '2026-05-23', session: 4045, raw: 0.141060, probability: 0.173041, candidate: false, closingProbability: 0.474585, closing: false, ret1: 0.006583, ret5: -0.021101, pr60: 0.041667, vol20: 0.007909, rubPerKzt: 0.151043 },
  { d: '2026-05-26', session: 4046, raw: 0.109599, probability: 0.143819, candidate: false, closingProbability: 0.445025, closing: false, ret1: 0.006099, ret5: -0.012510, pr60: 0.058333, vol20: 0.007970, rubPerKzt: 0.151967 },
  { d: '2026-05-27', session: 4047, raw: 0.002342, probability: 0.008155, candidate: false, closingProbability: 0.293887, closing: false, ret1: -0.001857, ret5: -0.005168, pr60: 0.058333, vol20: 0.007680, rubPerKzt: 0.151685 },
  { d: '2026-05-28', session: 4048, raw: 0.090382, probability: 0.124872, candidate: false, closingProbability: 0.389539, closing: false, ret1: -0.021288, ret5: -0.012395, pr60: 0.008333, vol20: 0.008350, rubPerKzt: 0.148490 },
  { d: '2026-05-29', session: 4049, raw: 0.020407, probability: 0.041588, candidate: false, closingProbability: 0.377355, closing: false, ret1: 0.006612, ret5: -0.003853, pr60: 0.025000, vol20: 0.008305, rubPerKzt: 0.149475 },
  { d: '2026-05-30', session: 4050, raw: 0.052364, probability: 0.083618, candidate: false, closingProbability: 0.406066, closing: false, ret1: -0.021661, ret5: -0.032097, pr60: 0.008333, vol20: 0.008471, rubPerKzt: 0.146272 },
  { d: '2026-06-02', session: 4051, raw: 0.149336, probability: 0.180434, candidate: true, closingProbability: 0.488262, closing: true, ret1: 0.006623, ret5: -0.031572, pr60: 0.025000, vol20: 0.008814, rubPerKzt: 0.147244 },
  { d: '2026-06-03', session: 4052, raw: 0.167670, probability: 0.196459, candidate: false, closingProbability: 0.457519, closing: false, ret1: 0.007793, ret5: -0.021922, pr60: 0.041667, vol20: 0.008966, rubPerKzt: 0.148396 },
  { d: '2026-06-04', session: 4053, raw: 0.504135, probability: 0.456321, candidate: false, closingProbability: 0.474801, closing: false, ret1: 0.002215, ret5: 0.001581, pr60: 0.075000, vol20: 0.009097, rubPerKzt: 0.148725 },
  { d: '2026-06-05', session: 4054, raw: 0.036635, probability: 0.064230, candidate: false, closingProbability: 0.314705, closing: false, ret1: 0.020709, ret5: 0.015678, pr60: 0.175000, vol20: 0.010686, rubPerKzt: 0.151837 },
  { d: '2026-06-06', session: 4055, raw: 0.306281, probability: 0.307740, candidate: true, closingProbability: 0.465305, closing: false, ret1: -0.003041, ret5: 0.034299, pr60: 0.158333, vol20: 0.010680, rubPerKzt: 0.151376 },
  { d: '2026-06-09', session: 4056, raw: 0.009676, probability: 0.023792, candidate: false, closingProbability: 0.309003, closing: false, ret1: -0.007107, ret5: 0.020569, pr60: 0.125000, vol20: 0.010715, rubPerKzt: 0.150304 },
  { d: '2026-06-10', session: 4057, raw: 0.160352, probability: 0.190117, candidate: false, closingProbability: 0.481267, closing: false, ret1: -0.015664, ret5: -0.002888, pr60: 0.041667, vol20: 0.011065, rubPerKzt: 0.147968 },
  { d: '2026-06-11', session: 4058, raw: 0.108068, probability: 0.142345, candidate: false, closingProbability: 0.389054, closing: false, ret1: -0.010339, ret5: -0.015442, pr60: 0.025000, vol20: 0.011015, rubPerKzt: 0.146446 },
  { d: '2026-06-12', session: 4059, raw: 0.218907, probability: 0.239213, candidate: true, closingProbability: 0.495899, closing: true, ret1: 0.004959, ret5: -0.031192, pr60: 0.041667, vol20: 0.011055, rubPerKzt: 0.147174 },
  { d: '2026-06-16', session: 4060, raw: 0.059453, probability: 0.091813, candidate: false, closingProbability: 0.319635, closing: false, ret1: 0.006016, ret5: -0.022136, pr60: 0.091667, vol20: 0.010929, rubPerKzt: 0.148062 },
  { d: '2026-06-17', session: 4061, raw: 0.443254, probability: 0.410606, candidate: false, closingProbability: 0.478340, closing: false, ret1: -0.008478, ret5: -0.023507, pr60: 0.041667, vol20: 0.011023, rubPerKzt: 0.146812 },
  { d: '2026-06-18', session: 4062, raw: 0.283524, probability: 0.290260, candidate: true, closingProbability: 0.478451, closing: true, ret1: 0.016992, ret5: 0.009149, pr60: 0.175000, vol20: 0.011702, rubPerKzt: 0.149328 },
  { d: '2026-06-19', session: 4063, raw: 0.174137, probability: 0.202007, candidate: false, closingProbability: 0.438024, closing: false, ret1: 0.003817, ret5: 0.023305, pr60: 0.208333, vol20: 0.011332, rubPerKzt: 0.149899 },
  { d: '2026-06-20', session: 4064, raw: 0.262613, probability: 0.274000, candidate: false, closingProbability: 0.482256, closing: false, ret1: 0.004486, ret5: 0.022832, pr60: 0.275000, vol20: 0.011369, rubPerKzt: 0.150573 },
  { d: '2026-06-23', session: 4065, raw: 0.602351, probability: 0.532118, candidate: true, closingProbability: 0.500299, closing: true, ret1: 0.003117, ret5: 0.019933, pr60: 0.300000, vol20: 0.011293, rubPerKzt: 0.151043 },
  { d: '2026-06-24', session: 4066, raw: 0.136222, probability: 0.168668, candidate: false, closingProbability: 0.348144, closing: false, ret1: 0.014317, ret5: 0.042728, pr60: 0.408333, vol20: 0.011669, rubPerKzt: 0.153221 },
  { d: '2026-06-25', session: 4067, raw: 0.212723, probability: 0.234183, candidate: false, closingProbability: 0.459814, closing: false, ret1: 0.003739, ret5: 0.029475, pr60: 0.425000, vol20: 0.011679, rubPerKzt: 0.153795 },
  { d: '2026-06-26', session: 4068, raw: 0.744060, probability: 0.651439, candidate: true, closingProbability: 0.571185, closing: true, ret1: 0.009745, ret5: 0.035403, pr60: 0.475000, vol20: 0.010619, rubPerKzt: 0.155301 },
  { d: '2026-06-27', session: 4069, raw: 0.313578, probability: 0.313306, candidate: false, closingProbability: 0.465747, closing: false, ret1: 0.022016, ret5: 0.052933, pr60: 0.541667, vol20: 0.011476, rubPerKzt: 0.158758 },
  { d: '2026-06-30', session: 4070, raw: 0.143945, probability: 0.175630, candidate: false, closingProbability: 0.443682, closing: false, ret1: 0.006748, ret5: 0.056565, pr60: 0.591667, vol20: 0.009914, rubPerKzt: 0.159833 },
  { d: '2026-07-01', session: 4071, raw: 0.827484, probability: 0.732412, candidate: true, closingProbability: 0.641495, closing: true, ret1: 0.007945, ret5: 0.050194, pr60: 0.725000, vol20: 0.009933, rubPerKzt: 0.161108 },
  { d: '2026-07-02', session: 4072, raw: 0.336146, probability: 0.330422, candidate: false, closingProbability: 0.611880, closing: false, ret1: 0.010497, ret5: 0.056951, pr60: 0.875000, vol20: 0.009999, rubPerKzt: 0.162808 },
  { d: '2026-07-03', session: 4073, raw: 0.290781, probability: 0.295856, candidate: false, closingProbability: 0.503591, closing: false, ret1: -0.001260, ret5: 0.045946, pr60: 0.875000, vol20: 0.010073, rubPerKzt: 0.162603 },
];
