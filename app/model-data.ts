export type ModelRow = {
  d: string;
  session: number;
  raw: number;
  probability: number;
  rankScore: number;
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
  configId: 'tabm_kzt_h3_expanding2010',
  model: 'TabM KZT H3',
  policy: 'rank80',
  nowRankThreshold: 0.6,
  rankWindow: 63,
  closingThreshold: 0.5,
  cooldownSessions: 2,
  maxContactsPerWeek: 2,
  featureCount: 33,
  historyStart: '2010-01-01',
  closingStatus: 'product_enabled',
} as const;

// Exact retrospective output of research_v4/h3_finalization for
// tabm_kzt_fullhistory + rank80, joined with the separately trained CLOSING_H3 head.
export const modelRows: ModelRow[] = [
  { d: '2026-05-01', session: 4031, raw: 0.231212, probability: 0.233848, rankScore: 0.428571, candidate: false, closingProbability: 0.512989, closing: false, ret1: -0.010502, ret5: -0.000833, pr60: 0.591667, vol20: 0.013489, rubPerKzt: 0.162066 },
  { d: '2026-05-05', session: 4032, raw: 0.104929, probability: 0.099299, rankScore: 0.111111, candidate: false, closingProbability: 0.226764, closing: false, ret1: 0.005538, ret5: -0.001263, pr60: 0.625000, vol20: 0.013598, rubPerKzt: 0.162966 },
  { d: '2026-05-06', session: 4033, raw: 0.353481, probability: 0.368032, rankScore: 0.587302, candidate: false, closingProbability: 0.534645, closing: false, ret1: -0.004736, ret5: 0.007861, pr60: 0.591667, vol20: 0.013520, rubPerKzt: 0.162196 },
  { d: '2026-05-07', session: 4034, raw: 0.108061, probability: 0.102527, rankScore: 0.111111, candidate: false, closingProbability: 0.276897, closing: false, ret1: -0.002630, ret5: -0.002026, pr60: 0.541667, vol20: 0.013286, rubPerKzt: 0.161770 },
  { d: '2026-05-08', session: 4035, raw: 0.145662, probability: 0.141832, rankScore: 0.206349, candidate: false, closingProbability: 0.288194, closing: false, ret1: -0.004610, ret5: -0.016940, pr60: 0.458333, vol20: 0.013110, rubPerKzt: 0.161026 },
  { d: '2026-05-09', session: 4036, raw: 0.088505, probability: 0.082513, rankScore: 0.079365, candidate: false, closingProbability: 0.308826, closing: false, ret1: -0.004363, ret5: -0.010801, pr60: 0.358333, vol20: 0.010192, rubPerKzt: 0.160325 },
  { d: '2026-05-13', session: 4037, raw: 0.085133, probability: 0.079099, rankScore: 0.079365, candidate: false, closingProbability: 0.308668, closing: false, ret1: -0.002217, ret5: -0.018555, pr60: 0.325000, vol20: 0.009107, rubPerKzt: 0.159970 },
  { d: '2026-05-14', session: 4038, raw: 0.204916, probability: 0.205289, rankScore: 0.412698, candidate: false, closingProbability: 0.523904, closing: false, ret1: -0.011790, ret5: -0.025609, pr60: 0.258333, vol20: 0.009391, rubPerKzt: 0.158095 },
  { d: '2026-05-15', session: 4039, raw: 0.065849, probability: 0.059815, rankScore: 0.031746, candidate: false, closingProbability: 0.335596, closing: false, ret1: -0.010767, ret5: -0.033746, pr60: 0.175000, vol20: 0.009481, rubPerKzt: 0.156402 },
  { d: '2026-05-16', session: 4040, raw: 0.102665, probability: 0.096971, rankScore: 0.142857, candidate: false, closingProbability: 0.433333, closing: false, ret1: -0.013764, ret5: -0.042900, pr60: 0.075000, vol20: 0.009563, rubPerKzt: 0.154264 },
  { d: '2026-05-19', session: 4041, raw: 0.124233, probability: 0.119315, rankScore: 0.206349, candidate: false, closingProbability: 0.370403, closing: false, ret1: -0.002492, ret5: -0.041030, pr60: 0.025000, vol20: 0.008521, rubPerKzt: 0.153880 },
  { d: '2026-05-20', session: 4042, raw: 0.038918, probability: 0.033765, rankScore: 0.015873, candidate: false, closingProbability: 0.233548, closing: false, ret1: -0.009199, ret5: -0.048012, pr60: 0.008333, vol20: 0.008484, rubPerKzt: 0.152471 },
  { d: '2026-05-21', session: 4043, raw: 0.402846, probability: 0.422256, rankScore: 0.698413, candidate: true, closingProbability: 0.578380, closing: false, ret1: -0.014062, ret5: -0.050283, pr60: 0.008333, vol20: 0.008815, rubPerKzt: 0.150342 },
  { d: '2026-05-22', session: 4044, raw: 0.452479, probability: 0.476481, rankScore: 0.730159, candidate: false, closingProbability: 0.655840, closing: false, ret1: -0.001931, ret5: -0.041448, pr60: 0.008333, vol20: 0.008726, rubPerKzt: 0.150052 },
  { d: '2026-05-23', session: 4045, raw: 0.279910, probability: 0.287125, rankScore: 0.555556, candidate: false, closingProbability: 0.573051, closing: false, ret1: 0.006583, ret5: -0.021101, pr60: 0.041667, vol20: 0.007909, rubPerKzt: 0.151043 },
  { d: '2026-05-26', session: 4046, raw: 0.360016, probability: 0.375221, rankScore: 0.666667, candidate: true, closingProbability: 0.536457, closing: true, ret1: 0.006099, ret5: -0.012510, pr60: 0.058333, vol20: 0.007970, rubPerKzt: 0.151967 },
  { d: '2026-05-27', session: 4047, raw: 0.025647, probability: 0.021466, rankScore: 0.000000, candidate: false, closingProbability: 0.187934, closing: false, ret1: -0.001857, ret5: -0.005168, pr60: 0.058333, vol20: 0.007680, rubPerKzt: 0.151685 },
  { d: '2026-05-28', session: 4048, raw: 0.224178, probability: 0.226191, rankScore: 0.460317, candidate: false, closingProbability: 0.406835, closing: false, ret1: -0.021288, ret5: -0.012395, pr60: 0.008333, vol20: 0.008350, rubPerKzt: 0.148490 },
  { d: '2026-05-29', session: 4049, raw: 0.079002, probability: 0.072921, rankScore: 0.111111, candidate: false, closingProbability: 0.301272, closing: false, ret1: 0.006612, ret5: -0.003853, pr60: 0.025000, vol20: 0.008305, rubPerKzt: 0.149475 },
  { d: '2026-05-30', session: 4050, raw: 0.105467, probability: 0.099853, rankScore: 0.206349, candidate: false, closingProbability: 0.342709, closing: false, ret1: -0.021661, ret5: -0.032097, pr60: 0.008333, vol20: 0.008471, rubPerKzt: 0.146272 },
  { d: '2026-06-02', session: 4051, raw: 0.350576, probability: 0.364837, rankScore: 0.650794, candidate: true, closingProbability: 0.598426, closing: true, ret1: 0.006623, ret5: -0.031572, pr60: 0.025000, vol20: 0.008814, rubPerKzt: 0.147244 },
  { d: '2026-06-03', session: 4052, raw: 0.445944, probability: 0.469365, rankScore: 0.746032, candidate: false, closingProbability: 0.633328, closing: false, ret1: 0.007793, ret5: -0.021922, pr60: 0.041667, vol20: 0.008966, rubPerKzt: 0.148396 },
  { d: '2026-06-04', session: 4053, raw: 0.774102, probability: 0.808942, rankScore: 0.984127, candidate: false, closingProbability: 0.736973, closing: false, ret1: 0.002215, ret5: 0.001581, pr60: 0.075000, vol20: 0.009097, rubPerKzt: 0.148725 },
  { d: '2026-06-05', session: 4054, raw: 0.093655, probability: 0.087750, rankScore: 0.158730, candidate: false, closingProbability: 0.326420, closing: false, ret1: 0.020709, ret5: 0.015678, pr60: 0.175000, vol20: 0.010686, rubPerKzt: 0.151837 },
  { d: '2026-06-06', session: 4055, raw: 0.536641, probability: 0.567249, rankScore: 0.809524, candidate: true, closingProbability: 0.659016, closing: false, ret1: -0.003041, ret5: 0.034299, pr60: 0.158333, vol20: 0.010680, rubPerKzt: 0.151376 },
  { d: '2026-06-09', session: 4056, raw: 0.057653, probability: 0.051762, rankScore: 0.063492, candidate: false, closingProbability: 0.177881, closing: false, ret1: -0.007107, ret5: 0.020569, pr60: 0.125000, vol20: 0.010715, rubPerKzt: 0.150304 },
  { d: '2026-06-10', session: 4057, raw: 0.343081, probability: 0.356591, rankScore: 0.603175, candidate: false, closingProbability: 0.568341, closing: false, ret1: -0.015664, ret5: -0.002888, pr60: 0.041667, vol20: 0.011065, rubPerKzt: 0.147968 },
  { d: '2026-06-11', session: 4058, raw: 0.184287, probability: 0.183033, rankScore: 0.412698, candidate: false, closingProbability: 0.414074, closing: false, ret1: -0.010339, ret5: -0.015442, pr60: 0.025000, vol20: 0.011015, rubPerKzt: 0.146446 },
  { d: '2026-06-12', session: 4059, raw: 0.434437, probability: 0.456815, rankScore: 0.730159, candidate: true, closingProbability: 0.516678, closing: true, ret1: 0.004959, ret5: -0.031192, pr60: 0.041667, vol20: 0.011055, rubPerKzt: 0.147174 },
  { d: '2026-06-16', session: 4060, raw: 0.114254, probability: 0.108932, rankScore: 0.253968, candidate: false, closingProbability: 0.277971, closing: false, ret1: 0.006016, ret5: -0.022136, pr60: 0.091667, vol20: 0.010929, rubPerKzt: 0.148062 },
  { d: '2026-06-17', session: 4061, raw: 0.717009, probability: 0.753392, rankScore: 0.968254, candidate: false, closingProbability: 0.738677, closing: false, ret1: -0.008478, ret5: -0.023507, pr60: 0.041667, vol20: 0.011023, rubPerKzt: 0.146812 },
  { d: '2026-06-18', session: 4062, raw: 0.502696, probability: 0.530859, rankScore: 0.793651, candidate: true, closingProbability: 0.520808, closing: true, ret1: 0.016992, ret5: 0.009149, pr60: 0.175000, vol20: 0.011702, rubPerKzt: 0.149328 },
  { d: '2026-06-19', session: 4063, raw: 0.243212, probability: 0.246938, rankScore: 0.571429, candidate: false, closingProbability: 0.421206, closing: false, ret1: 0.003817, ret5: 0.023305, pr60: 0.208333, vol20: 0.011332, rubPerKzt: 0.149899 },
  { d: '2026-06-20', session: 4064, raw: 0.421783, probability: 0.442990, rankScore: 0.746032, candidate: false, closingProbability: 0.565399, closing: false, ret1: 0.004486, ret5: 0.022832, pr60: 0.275000, vol20: 0.011369, rubPerKzt: 0.150573 },
  { d: '2026-06-23', session: 4065, raw: 0.727204, probability: 0.763453, rankScore: 0.984127, candidate: true, closingProbability: 0.721161, closing: true, ret1: 0.003117, ret5: 0.019933, pr60: 0.300000, vol20: 0.011293, rubPerKzt: 0.151043 },
  { d: '2026-06-24', session: 4066, raw: 0.195211, probability: 0.194800, rankScore: 0.444444, candidate: false, closingProbability: 0.284917, closing: false, ret1: 0.014317, ret5: 0.042728, pr60: 0.408333, vol20: 0.011669, rubPerKzt: 0.153221 },
  { d: '2026-06-25', session: 4067, raw: 0.316656, probability: 0.327514, rankScore: 0.619048, candidate: false, closingProbability: 0.491899, closing: false, ret1: 0.003739, ret5: 0.029475, pr60: 0.425000, vol20: 0.011679, rubPerKzt: 0.153795 },
  { d: '2026-06-26', session: 4068, raw: 0.783633, probability: 0.818018, rankScore: 1.000000, candidate: true, closingProbability: 0.770074, closing: true, ret1: 0.009745, ret5: 0.035403, pr60: 0.475000, vol20: 0.010619, rubPerKzt: 0.155301 },
  { d: '2026-06-27', session: 4069, raw: 0.508869, probability: 0.537501, rankScore: 0.841270, candidate: false, closingProbability: 0.651041, closing: false, ret1: 0.022016, ret5: 0.052933, pr60: 0.541667, vol20: 0.011476, rubPerKzt: 0.158758 },
  { d: '2026-06-30', session: 4070, raw: 0.250007, probability: 0.254363, rankScore: 0.571429, candidate: false, closingProbability: 0.535658, closing: false, ret1: 0.006748, ret5: 0.056565, pr60: 0.591667, vol20: 0.009914, rubPerKzt: 0.159833 },
  { d: '2026-07-01', session: 4071, raw: 0.806812, probability: 0.839829, rankScore: 1.000000, candidate: true, closingProbability: 0.842299, closing: true, ret1: 0.007945, ret5: 0.050194, pr60: 0.725000, vol20: 0.009933, rubPerKzt: 0.161108 },
  { d: '2026-07-02', session: 4072, raw: 0.491703, probability: 0.519006, rankScore: 0.809524, candidate: false, closingProbability: 0.530323, closing: false, ret1: 0.010497, ret5: 0.056951, pr60: 0.875000, vol20: 0.009999, rubPerKzt: 0.162808 },
  { d: '2026-07-03', session: 4073, raw: 0.401081, probability: 0.420321, rankScore: 0.682540, candidate: false, closingProbability: 0.655025, closing: false, ret1: -0.001260, ret5: 0.045946, pr60: 0.875000, vol20: 0.010073, rubPerKzt: 0.162603 },
];
