import React, { useState, useMemo } from 'react';
import { Card } from '../components/ui/Card';

// #region Data
const hvacData = [
  { id: 'F075', mainSystem: 'Pressurisations', building: 'B4', equipment: 'Pressurization Unit #4', ppmVisit: 'N/A', finding: 'No issues reported', qty: 'N/A', priority: 'N/A', status: 'Closed - Verified', actionRequired: 'N/A', notes: 'No findings reported in any PPM.' },
  { id: 'F001', mainSystem: 'York Chiller', building: 'CIF', equipment: 'Chiller #1 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Water sensor inlet defective', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status in PPM2. Persists through PPM4.' },
  { id: 'F002', mainSystem: 'York Chiller', building: 'CIF', equipment: 'Chiller #1 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Plug sensor defective', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'PPM1 (Qty 1), "Need LPO" in PPM2. Qty updated to 2 in PPM3. Persists.' },
  { id: 'F003', mainSystem: 'York Chiller', building: 'CIF', equipment: 'Chiller #1 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Plug transducer defective', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'PPM1 (Qty 1), "Need LPO" in PPM2. Qty updated to 2 in PPM3. Persists.' },
  { id: 'F005', mainSystem: 'York Chiller', building: 'FM', equipment: 'Chiller #1', ppmVisit: 'PPM 1', finding: 'Fuse 3A defective', qty: 3, priority: 'Medium', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F006', mainSystem: 'York Chiller', building: 'FM', equipment: 'Chiller #1', ppmVisit: 'PPM 1', finding: 'Fuse 20A defective', qty: 6, priority: 'Medium', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F007', mainSystem: 'York Chiller', building: 'FM', equipment: 'Chiller #1', ppmVisit: 'PPM 1', finding: 'Water sensor defective', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F008', mainSystem: 'York Chiller', building: 'FM', equipment: 'Chiller #1', ppmVisit: 'PPM 1', finding: 'Plug sensor defective', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F009', mainSystem: 'York Chiller', building: 'FM', equipment: 'Chiller #1', ppmVisit: 'PPM 1', finding: 'Plug transducer defective', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F010', mainSystem: 'York Chiller', building: 'FM', equipment: 'Chiller #1', ppmVisit: 'PPM 1', finding: 'Flow switch defective', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F011', mainSystem: 'York Chiller', building: 'FM', equipment: 'Chiller #1', ppmVisit: 'PPM 1', finding: 'Leak test required', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for test & repair', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F012', mainSystem: 'York Chiller', building: 'FM', equipment: 'Chiller #1', ppmVisit: 'PPM 1', finding: 'Solenoid valve defective', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F013', mainSystem: 'York Chiller', building: 'FM', equipment: 'Chiller #1', ppmVisit: 'PPM 1', finding: 'Pipe insulation required', qty: 1, priority: 'Low', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for installation', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F028', mainSystem: 'York Chiller', building: 'B1', equipment: 'Pressurization Unit #3', ppmVisit: 'PPM 1', finding: 'High-pressure cut-out defective', qty: 1, priority: 'High', status: 'Closed - Verified', actionRequired: 'N/A', notes: 'Identified in PPM1. Contractor reported "DONE" in PPM2.' },
  { id: 'F030', mainSystem: 'York Chiller', building: 'B1', equipment: 'Chiller #1 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Transformer 24V defective', qty: 1, priority: 'Critical', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Critical for operation.' },
  { id: 'F031', mainSystem: 'York Chiller', building: 'B1', equipment: 'Chiller #1 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Fuse 12A defective', qty: 1, priority: 'Medium', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2.' },
  { id: 'F032', mainSystem: 'York Chiller', building: 'B1', equipment: 'Chiller #1 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Fuse 20A defective', qty: 6, priority: 'Medium', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2.' },
  { id: 'F033', mainSystem: 'York Chiller', building: 'B1', equipment: 'Chiller #1 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Plug sensor defective', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2.' },
  { id: 'F034', mainSystem: 'York Chiller', building: 'B1', equipment: 'Chiller #1 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Plug transducer defective', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2.' },
  { id: 'F035', mainSystem: 'York Chiller', building: 'B1', equipment: 'Chiller #1 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Flow switch defective', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2.' },
  { id: 'F036', mainSystem: 'York Chiller', building: 'B1', equipment: 'Chiller #1 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Water sensor defective', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2.' },
  { id: 'F037', mainSystem: 'York Chiller', building: 'B1', equipment: 'Chiller #1 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Pipe insulation required', qty: 1, priority: 'Low', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for installation', notes: 'Identified in PPM1. "Need LPO" status from PPM2.' },
  { id: 'F038', mainSystem: 'York Chiller', building: 'B1', equipment: 'Chiller #1 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Leak test required', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for test & repair', notes: 'Identified in PPM1. "Need LPO" status from PPM2.' },
  { id: 'F040', mainSystem: 'York Chiller', building: 'B1', equipment: 'Chiller #2', ppmVisit: 'PPM 1', finding: 'Fuse defective', qty: 1, priority: 'Medium', status: 'Closed - Verified', actionRequired: 'N/A', notes: 'Identified in PPM1. Not mentioned in subsequent reports, implies rectification.' },
  { id: 'F041', mainSystem: 'York Chiller', building: 'B1', equipment: 'Chiller #2', ppmVisit: 'PPM 1', finding: 'Plug sensor defective', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'PPM1 (Qty 1), "Need LPO" in PPM2. Qty updated to 2 in PPM2. Persists.' },
  { id: 'F042', mainSystem: 'York Chiller', building: 'B1', equipment: 'Chiller #2', ppmVisit: 'PPM 1', finding: 'Flow switch defective', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F046', mainSystem: 'Pressurisations', building: 'B2', equipment: 'Pressurization Unit #3', ppmVisit: 'PPM 1', finding: 'High-pressure cut-out defective', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F047', mainSystem: 'York Chiller', building: 'B2', equipment: 'Chiller #1 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Fuse 12A defective', qty: 1, priority: 'Medium', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F048', mainSystem: 'York Chiller', building: 'B2', equipment: 'Chiller #1 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Fuse 20A defective', qty: 6, priority: 'Medium', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F049', mainSystem: 'York Chiller', building: 'B2', equipment: 'Chiller #1 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Leak test required', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for test & repair', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F050', mainSystem: 'York Chiller', building: 'B2', equipment: 'Chiller #1 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Cooler insulation required', qty: 1, priority: 'Low', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for installation', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F051', mainSystem: 'York Chiller', building: 'B2', equipment: 'Chiller #1 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Plug sensor defective', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F052', mainSystem: 'York Chiller', building: 'B2', equipment: 'Chiller #1 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Plug transducer defective', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F053', mainSystem: 'York Chiller', building: 'B2', equipment: 'Chiller #1 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Flow switch defective', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F054', mainSystem: 'York Chiller', building: 'B2', equipment: 'Chiller #1 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Water sensor defective', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F060', mainSystem: 'Pressurisations', building: 'B2', equipment: 'Pressurization Unit #4', ppmVisit: 'PPM 1', finding: 'High-pressure cut-out defective', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F061', mainSystem: 'York Chiller', building: 'B3', equipment: 'Chiller #1', ppmVisit: 'PPM 1', finding: 'Flow switch defective', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F062', mainSystem: 'York Chiller', building: 'B3', equipment: 'Chiller #1', ppmVisit: 'PPM 1', finding: 'On/off switch defective', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F067', mainSystem: 'York Chiller', building: 'B4', equipment: 'Chiller #1', ppmVisit: 'PPM 1', finding: 'Plug sensor defective', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'PPM1 (Qty 1), "Need LPO" in PPM2. Qty updated to 2 in PPM3. Persists.' },
  { id: 'F068', mainSystem: 'York Chiller', building: 'B4', equipment: 'Chiller #1', ppmVisit: 'PPM 1', finding: 'Plug transducer defective', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'PPM1 (Qty 1), "Need LPO" in PPM2. Qty updated to 2 in PPM3. Persists.' },
  { id: 'F069', mainSystem: 'York Chiller', building: 'B4', equipment: 'Chiller #1', ppmVisit: 'PPM 1', finding: 'Flow switch defective', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F070', mainSystem: 'York Chiller', building: 'B4', equipment: 'Chiller #2', ppmVisit: 'PPM 1', finding: 'Plug sensor defective', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'PPM1 (Qty 1), "Need LPO" in PPM2. Qty updated to 2 in PPM3. Persists.' },
  { id: 'F071', mainSystem: 'York Chiller', building: 'B4', equipment: 'Chiller #2', ppmVisit: 'PPM 1', finding: 'Plug transducer defective', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'PPM1 (Qty 1), "Need LPO" in PPM2. Qty updated to 2 in PPM3. Persists.' },
  { id: 'F072', mainSystem: 'York Chiller', building: 'B4', equipment: 'Chiller #2', ppmVisit: 'PPM 1', finding: 'Flow switch defective', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F076', mainSystem: 'York Chiller', building: 'B5', equipment: 'Chiller #1', ppmVisit: 'PPM 1', finding: 'Fuse 12A defective', qty: 1, priority: 'Medium', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F077', mainSystem: 'York Chiller', building: 'B5', equipment: 'Chiller #1', ppmVisit: 'PPM 1', finding: 'Fuse 20A defective', qty: 6, priority: 'Medium', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F078', mainSystem: 'York Chiller', building: 'B5', equipment: 'Chiller #1', ppmVisit: 'PPM 1', finding: 'Water sensor defective', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F079', mainSystem: 'York Chiller', building: 'B5', equipment: 'Chiller #1', ppmVisit: 'PPM 1', finding: 'Plug sensor defective', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F080', mainSystem: 'York Chiller', building: 'B5', equipment: 'Chiller #1', ppmVisit: 'PPM 1', finding: 'Plug transducer defective', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F081', mainSystem: 'York Chiller', building: 'B5', equipment: 'Chiller #1', ppmVisit: 'PPM 1', finding: 'Flow switch defective', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F082', mainSystem: 'York Chiller', building: 'B5', equipment: 'Chiller #1', ppmVisit: 'PPM 1', finding: 'Leak test required', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for test & repair', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F083', mainSystem: 'York Chiller', building: 'B5', equipment: 'Chiller #1', ppmVisit: 'PPM 1', finding: 'New cooler required', qty: 1, priority: 'Critical', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F084', mainSystem: 'York Chiller', building: 'B5', equipment: 'Chiller #2', ppmVisit: 'PPM 1', finding: 'Flow switch defective', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F085', mainSystem: 'York Chiller', building: 'B5', equipment: 'Chiller #2', ppmVisit: 'PPM 1', finding: 'On/off switch defective', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F088', mainSystem: 'Pressurisations', building: 'B5', equipment: 'Pressurization Unit #7', ppmVisit: 'PPM 1', finding: 'High-pressure cut-out defective', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F089', mainSystem: 'York Chiller', building: 'B6', equipment: 'Chiller #1', ppmVisit: 'PPM 1', finding: 'Plug sensor defective', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F090', mainSystem: 'York Chiller', building: 'B6', equipment: 'Chiller #1', ppmVisit: 'PPM 1', finding: 'Plug transducer defective', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F091', mainSystem: 'York Chiller', building: 'B6', equipment: 'Chiller #1', ppmVisit: 'PPM 1', finding: 'Flow switch defective', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F093', mainSystem: 'York Chiller', building: 'B6', equipment: 'Chiller #2', ppmVisit: 'PPM 1', finding: 'Plug sensor defective', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F094', mainSystem: 'York Chiller', building: 'B6', equipment: 'Chiller #2', ppmVisit: 'PPM 1', finding: 'Plug transducer defective', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F095', mainSystem: 'York Chiller', building: 'B6', equipment: 'Chiller #2', ppmVisit: 'PPM 1', finding: 'Flow switch defective', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F096', mainSystem: 'Pressurisations', building: 'B6', equipment: 'Pressurization Unit #8', ppmVisit: 'PPM 1', finding: 'Switch pressure cut-out defective', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F097', mainSystem: 'York Chiller', building: 'B7', equipment: 'Chiller #1 (Sys #1)', ppmVisit: 'PPM 1', finding: 'Plug sensor defective', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F098', mainSystem: 'York Chiller', building: 'B7', equipment: 'Chiller #1 (Sys #1)', ppmVisit: 'PPM 1', finding: 'Plug transducer defective', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F099', mainSystem: 'York Chiller', building: 'B7', equipment: 'Chiller #1 (Sys #1)', ppmVisit: 'PPM 1', finding: 'Flow switch defective', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F101', mainSystem: 'York Chiller', building: 'B7', equipment: 'Chiller #2 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Fuse 3A defective', qty: 3, priority: 'Medium', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F102', mainSystem: 'York Chiller', building: 'B7', equipment: 'Chiller #2 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Water pump bearing replacement', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F103', mainSystem: 'York Chiller', building: 'B7', equipment: 'Chiller #2 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Plug sensor defective', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F104', mainSystem: 'York Chiller', building: 'B7', equipment: 'Chiller #2 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Plug transducer defective', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F105', mainSystem: 'York Chiller', building: 'B7', equipment: 'Chiller #2 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Flow switch defective', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F106', mainSystem: 'York Chiller', building: 'B7', equipment: 'Chiller #2 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Leak test required', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for test & repair', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F112', mainSystem: 'Pressurisations', building: 'B7', equipment: 'Pressurization Unit #2', ppmVisit: 'PPM 1', finding: 'Switch pressure cut-out defective', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2.' },
  { id: 'F113', mainSystem: 'Pressurisations', building: 'B7', equipment: 'Pressurization Unit #2', ppmVisit: 'PPM 1', finding: 'Valve 1" replacement needed', qty: 4, priority: 'Medium', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2.' },
  { id: 'F114', mainSystem: 'Pressurisations', building: 'B7', equipment: 'Pressurization Unit #2', ppmVisit: 'PPM 1', finding: 'Bearing replacement needed', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2.' },
  { id: 'F118', mainSystem: '(All)', building: 'B8', equipment: '(Misc. Water Chemical Treatment)', ppmVisit: 'PPM 1', finding: 'Chemical treatment for water systems', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for service', notes: 'Identified in PPM1. "Need LPO" status from PPM2.' },
  { id: 'F120', mainSystem: 'York Chiller', building: 'B8', equipment: 'Chiller #1 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Fuse defective', qty: 1, priority: 'Medium', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2.' },
  { id: 'F121', mainSystem: 'York Chiller', building: 'B8', equipment: 'Chiller #1 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Suction transducer defective', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F122', mainSystem: 'York Chiller', building: 'B8', equipment: 'Chiller #1 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Plug sensor defective', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F123', mainSystem: 'York Chiller', building: 'B8', equipment: 'Chiller #1 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Plug transducer defective', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F124', mainSystem: 'York Chiller', building: 'B8', equipment: 'Chiller #1 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Flow switch defective', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F125', mainSystem: 'York Chiller', building: 'B8', equipment: 'Chiller #1 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Pump No.1 requires overhauling', qty: 1, priority: 'Critical', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for overhaul', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F127', mainSystem: 'York Chiller', building: 'B8', equipment: 'Chiller #2 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Suction transducer defective', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F128', mainSystem: 'York Chiller', building: 'B8', equipment: 'Chiller #2 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Discharge transducer defective', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F129', mainSystem: 'York Chiller', building: 'B8', equipment: 'Chiller #2 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Filter drier holder replacement', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F130', mainSystem: 'York Chiller', building: 'B8', equipment: 'Chiller #2 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Plug sensor defective', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F131', mainSystem: 'York Chiller', building: 'B8', equipment: 'Chiller #2 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Plug transducer defective', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F132', mainSystem: 'York Chiller', building: 'B8', equipment: 'Chiller #2 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Condenser fan bearing replacement', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1 (Qty 1). "Need LPO" status from PPM2. Qty updated to 2 in PPM3.' },
  { id: 'F133', mainSystem: 'York Chiller', building: 'B8', equipment: 'Chiller #2 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Pump No.2 requires overhauling', qty: 1, priority: 'Critical', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for overhaul', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F134', mainSystem: 'York Chiller', building: 'B8', equipment: 'Chiller #2 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Water sensor inlet defective', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F135', mainSystem: 'York Chiller', building: 'B8', equipment: 'Chiller #2 (Sys #1 & #2)', ppmVisit: 'PPM 1', finding: 'Fuse defective', qty: 2, priority: 'Medium', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1 (Qty 1). "Need LPO" status from PPM2. Qty updated to 2 in PPM3.' },
  { id: 'F137', mainSystem: 'Pressurisations', building: 'B8', equipment: 'Pressurization Unit #10', ppmVisit: 'PPM 1', finding: 'High-pressure cut-out defective', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F138', mainSystem: 'Pressurisations', building: 'B8', equipment: 'Pressurization Unit #10', ppmVisit: 'PPM 1', finding: 'Pipe connector for pump needed', qty: 1, priority: 'Medium', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM1. "Need LPO" status from PPM2. Persists.' },
  { id: 'F014', mainSystem: 'York Chiller', building: 'FM', equipment: 'Chiller #1', ppmVisit: 'PPM 2', finding: 'Pump bearing requires replacement', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM2. PPM3 confirms noise.' },
  { id: 'F015', mainSystem: 'York Chiller', building: 'FM', equipment: 'Chiller #1', ppmVisit: 'PPM 2', finding: 'Check valve requires replacement', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Identified in PPM2. PPM3 confirms pump noise.' },
  { id: 'F029', mainSystem: 'York Chiller', building: 'B1', equipment: 'Pressurization Unit #3', ppmVisit: 'PPM 2', finding: 'Valve 1" replacement needed', qty: 4, priority: 'Medium', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Newly identified in PPM2. Still pending.' },
  { id: 'F039', mainSystem: 'York Chiller', building: 'B1', equipment: 'Chiller #1 (Sys #1 & #2)', ppmVisit: 'PPM 2', finding: 'Solenoid valve defective', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Newly identified in PPM2.' },
  { id: 'F043', mainSystem: 'York Chiller', building: 'B1', equipment: 'Chiller #2', ppmVisit: 'PPM 2', finding: 'Plug transducer defective', qty: 2, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Newly identified in PPM2. Persists.' },
  { id: 'F044', mainSystem: 'York Chiller', building: 'B1', equipment: 'Chiller #2', ppmVisit: 'PPM 2', finding: 'Water temperature sensor inlet defective', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Newly identified in PPM2. Persists.' },
  { id: 'F045', mainSystem: 'York Chiller', building: 'B1', equipment: 'Chiller #2', ppmVisit: 'PPM 2', finding: 'Leak test required', qty: 1, priority: 'High', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for test & repair', notes: 'Newly identified in PPM2. Persists.' },
  { id: 'F055', mainSystem: 'York Chiller', building: 'B2', equipment: 'Chiller #1 (Sys #1 & #2)', ppmVisit: 'PPM 2', finding: 'New Cooler required', qty: 1, priority: 'Critical', status: 'Quote Submitted / Awaiting LPO', actionRequired: 'Approve LPO for replacement', notes: 'Newly identified in PPM2.' },
  { id: 'F016', mainSystem: 'York Chiller', building: 'FM', equipment: 'Chiller #1', ppmVisit: 'PPM 3', finding: 'Power main switch defective', qty: 1, priority: 'Critical', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM3. Persists.' },
  { id: 'F017', mainSystem: 'York Chiller', building: 'FM', equipment: 'Chiller #1', ppmVisit: 'PPM 3', finding: 'Water pressure gauge defective', qty: 1, priority: 'Medium', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM3. Persists.' },
  { id: 'F018', mainSystem: 'York Chiller', building: 'FM', equipment: 'Chiller #1', ppmVisit: 'PPM 3', finding: 'Condenser fan motor requires bearing', qty: 1, priority: 'High', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM3. Persists.' },
  { id: 'F019', mainSystem: 'York Chiller', building: 'FM', equipment: 'Chiller #1', ppmVisit: 'PPM 3', finding: 'Pump requires overhauling', qty: 1, priority: 'Critical', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM3. Persists.' },
  { id: 'F020', mainSystem: 'York Chiller', building: 'FM', equipment: 'Chiller #2', ppmVisit: 'PPM 3', finding: 'Pump No.1 requires overhauling', qty: 1, priority: 'Critical', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM3. Persists.' },
  { id: 'F021', mainSystem: 'York Chiller', building: 'FM', equipment: 'Chiller #2', ppmVisit: 'PPM 3', finding: 'Pump No.2 requires overhauling', qty: 1, priority: 'Critical', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM3. Persists.' },
  { id: 'F022', mainSystem: 'York Chiller', building: 'FM', equipment: 'Chiller #2', ppmVisit: 'PPM 3', finding: 'Water Sensor Inlet Defective', qty: 1, priority: 'High', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM3. Persists.' },
  { id: 'F023', mainSystem: 'York Chiller', building: 'FM', equipment: 'Chiller #2', ppmVisit: 'PPM 3', finding: 'EXV (Expansion Valve) defective', qty: 1, priority: 'High', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM3. Persists.' },
  { id: 'F024', mainSystem: 'York Chiller', building: 'FM', equipment: 'Chiller #2', ppmVisit: 'PPM 3', finding: 'Condenser fan motor bearing replacement', qty: 2, priority: 'High', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM3. Persists.' },
  { id: 'F025', mainSystem: 'Pressurisations', building: 'FM', equipment: 'Pressurization Unit No.2', ppmVisit: 'PPM 3', finding: 'High pressure cut-out replacement', qty: 1, priority: 'High', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM3. Persists.' },
  { id: 'F026', mainSystem: 'Pressurisations', building: 'FM', equipment: 'Pressurization Unit No.2', ppmVisit: 'PPM 3', finding: 'Switch pressure cut-out replacement', qty: 1, priority: 'High', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM3. Persists.' },
  { id: 'F027', mainSystem: 'Pressurisations', building: 'FM', equipment: 'Pressurization Unit No.2', ppmVisit: 'PPM 3', finding: 'Bearing replacement needed', qty: 1, priority: 'High', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM3. Persists.' },
  { id: 'F056', mainSystem: 'York Chiller', building: 'B2', equipment: 'Chiller #1 Sys#2', ppmVisit: 'PPM 3', finding: 'Plug Sensor Defective', qty: 2, priority: 'High', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM3. Persists.' },
  { id: 'F057', mainSystem: 'York Chiller', building: 'B2', equipment: 'Chiller #1 Sys#2', ppmVisit: 'PPM 3', finding: 'Plug Transducer Defective', qty: 2, priority: 'High', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM3. Persists.' },
  { id: 'F058', mainSystem: 'York Chiller', building: 'B2', equipment: 'Chiller #1 Sys#2', ppmVisit: 'PPM 3', finding: 'Flow Switch Defective', qty: 1, priority: 'High', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM3. Not mentioned in PPM4.' },
  { id: 'F063', mainSystem: 'York Chiller', building: 'B3', equipment: 'Chiller #2', ppmVisit: 'PPM 3', finding: 'Flow Switch Defective', qty: 1, priority: 'High', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM3.' },
  { id: 'F064', mainSystem: 'York Chiller', building: 'B3', equipment: 'Chiller #2', ppmVisit: 'PPM 3', finding: 'Plug Sensor Defective', qty: 2, priority: 'High', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM3. Persists.' },
  { id: 'F065', mainSystem: 'York Chiller', building: 'B3', equipment: 'Chiller #2', ppmVisit: 'PPM 3', finding: 'Plug Transducer Defective', qty: 2, priority: 'High', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM3. Persists.' },
  { id: 'F066', mainSystem: 'York Chiller', building: 'B3', equipment: 'Chiller #2', ppmVisit: 'PPM 3', finding: 'On/Off Switch Defective', qty: 1, priority: 'High', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM3. Persists.' },
  { id: 'F086', mainSystem: 'York Chiller', building: 'B5', equipment: 'Chiller#1 Sys#2', ppmVisit: 'PPM 3', finding: 'Leak test required', qty: 1, priority: 'High', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM3. Persists.' },
  { id: 'F087', mainSystem: 'York Chiller', building: 'B5', equipment: 'Chiller#2 Sys#2', ppmVisit: 'PPM 3', finding: 'Leak test required', qty: 1, priority: 'High', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM3. Persists.' },
  { id: 'F092', mainSystem: 'York Chiller', building: 'B6', equipment: 'Chiller #1', ppmVisit: 'PPM 3', finding: 'Condenser fan motor bearing replacement', qty: 4, priority: 'High', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM3. Persists.' },
  { id: 'F100', mainSystem: 'York Chiller', building: 'B7', equipment: 'Chiller #1 (Sys #1)', ppmVisit: 'PPM 3', finding: 'Condenser fan motor bearing replacement', qty: 2, priority: 'High', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM3. Persists.' },
  { id: 'F107', mainSystem: 'York Chiller', building: 'B7', equipment: 'Chiller#1 Sys #2', ppmVisit: 'PPM 3', finding: 'Condenser fan contactor defective', qty: 2, priority: 'High', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM3. Persists.' },
  { id: 'F108', mainSystem: 'York Chiller', building: 'B7', equipment: 'Chiller#1 Sys #2', ppmVisit: 'PPM 3', finding: 'Fan motor requires rewinding', qty: 1, priority: 'High', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM3. Persists.' },
  { id: 'F109', mainSystem: 'York Chiller', building: 'B7', equipment: 'Chiller#1 Sys #2', ppmVisit: 'PPM 3', finding: 'Leak test required', qty: 1, priority: 'High', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM3. Persists.' },
  { id: 'F110', mainSystem: 'York Chiller', building: 'B7', equipment: 'Chiller#1 Sys #2', ppmVisit: 'PPM 3', finding: 'Fuse defective', qty: 3, priority: 'Medium', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM3. Persists.' },
  { id: 'F111', mainSystem: 'York Chiller', building: 'B7', equipment: 'Chiller#1 Sys #2', ppmVisit: 'PPM 3', finding: 'Water pump bearing change', qty: 1, priority: 'High', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM3. Persists.' },
  { id: 'F115', mainSystem: 'Pressurisations', building: 'B7', equipment: 'Pressurization Unit No.9', ppmVisit: 'PPM 3', finding: 'Start control handle set needed', qty: 1, priority: 'Medium', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM3. Persists.' },
  { id: 'F116', mainSystem: 'Pressurisations', building: 'B7', equipment: 'Pressurization Unit No.9', ppmVisit: 'PPM 3', finding: 'Switch pressure cut-out replacement', qty: 1, priority: 'High', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM3. Persists.' },
  { id: 'F117', mainSystem: 'Pressurisations', building: 'B7', equipment: 'Pressurization Unit No.9', ppmVisit: 'PPM 3', finding: 'Valve 1" replacement needed', qty: 4, priority: 'Medium', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM3. Persists.' },
  { id: 'F119', mainSystem: 'York Chiller', building: 'B8', equipment: 'Chiller #1 (Sys #1 & #2)', ppmVisit: 'PPM 3', finding: 'No refrigerant gas', qty: 1, priority: 'Critical', status: 'Open - Action Required', actionRequired: 'Contractor to leak test and quote', notes: 'Identified in PPM3. Root cause of other issues.' },
  { id: 'F126', mainSystem: 'York Chiller', building: 'B8', equipment: 'Chiller #2 (Sys #1 & #2)', ppmVisit: 'PPM 3', finding: 'No refrigerant gas', qty: 1, priority: 'Critical', status: 'Open - Action Required', actionRequired: 'Contractor to leak test and quote', notes: 'Identified in PPM3. Root cause of other issues.' },
  { id: 'F136', mainSystem: 'York Chiller', building: 'B8', equipment: 'Chiller #2 (Sys #1 & #2)', ppmVisit: 'PPM 3', finding: 'Flow switch defective', qty: 1, priority: 'High', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM3.' },
  { id: 'F004', mainSystem: 'York Chiller', building: 'CIF', equipment: 'Chiller #1 (Sys #1 & #2)', ppmVisit: 'PPM 4', finding: 'Educator sensor defective', qty: 1, priority: 'High', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified during PPM4 visit.' },
  { id: 'F059', mainSystem: 'York Chiller', building: 'B2', equipment: 'Chiller #1 Sys#2', ppmVisit: 'PPM 4', finding: 'Leak test required', qty: 1, priority: 'High', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM4.' },
  { id: 'F073', mainSystem: 'Pressurisations', building: 'B4', equipment: 'Pressurization Unit No.6', ppmVisit: 'PPM 4', finding: 'Switch pressure cut-out replacement', qty: 1, priority: 'High', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM4.' },
  { id: 'F074', mainSystem: 'Pressurisations', building: 'B4', equipment: 'Pressurization Unit No.6', ppmVisit: 'PPM 4', finding: 'Pump requires painting', qty: 1, priority: 'Low', status: 'Open - Action Required', actionRequired: 'Contractor to provide quotation', notes: 'Newly identified in PPM4.' },
];
type Priority = 'Critical' | 'High' | 'Medium' | 'Low' | 'N/A';
type Status = 'Closed - Verified' | 'Quote Submitted / Awaiting LPO' | 'Open - Action Required';
// #endregion

// #region Components
const ICONS = {
    total: ({className}: {className?: string}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" /></svg>,
    open: ({className}: {className?: string}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>,
    critical: ({className}: {className?: string}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>,
    lpo: ({className}: {className?: string}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
}

const SummaryCard: React.FC<{icon: keyof typeof ICONS, title: string, value: number, color: 'blue'|'orange'|'red'|'purple'}> = ({icon, title, value, color}) => {
    const Icon = ICONS[icon];
    const colors = {
        blue: 'text-chart-5 bg-chart-5/20',
        orange: 'text-warning bg-warning/20',
        red: 'text-destructive bg-destructive/20',
        purple: 'text-primary bg-primary/20',
    }
    return (
        <Card className="flex items-start gap-4 p-4">
            <div className={`p-3 rounded-lg ${colors[color]}`}>
                <Icon className="w-6 h-6"/>
            </div>
            <div>
                <p className="text-2xl font-bold text-foreground">{value}</p>
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{title}</p>
            </div>
        </Card>
    )
}

const PriorityBadge: React.FC<{ priority: Priority }> = ({ priority }) => {
    const priorityClasses: Record<Priority, string> = {
        'Critical': 'bg-destructive text-destructive-foreground',
        'High': 'bg-red-500 text-white',
        'Medium': 'bg-warning text-yellow-800',
        'Low': 'bg-accent text-accent-foreground',
        'N/A': 'bg-secondary text-secondary-foreground',
    };
    return <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${priorityClasses[priority]}`}>{priority}</span>;
}

const StatusBadge: React.FC<{ status: Status }> = ({ status }) => {
    const statusClasses: Record<Status, string> = {
        'Closed - Verified': 'bg-chart-2/20 text-chart-2',
        'Quote Submitted / Awaiting LPO': 'bg-primary/20 text-primary',
        'Open - Action Required': 'bg-warning/20 text-warning',
    };
    return <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusClasses[status]}`}>{status}</span>;
}
// #endregion

export const HvacSystem: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedBuilding, setSelectedBuilding] = useState('all');
    const [selectedPriority, setSelectedPriority] = useState<Priority | 'all'>('all');
    const [selectedStatus, setSelectedStatus] = useState<Status | 'all'>('all');
    const rowsPerPage = 10;

    const { buildings, priorities, statuses } = useMemo(() => {
        const buildingSet = new Set<string>();
        const prioritySet = new Set<Priority>();
        const statusSet = new Set<Status>();
        hvacData.forEach(item => {
            buildingSet.add(item.building);
            prioritySet.add(item.priority as Priority);
            statusSet.add(item.status as Status);
        });
        return {
            buildings: Array.from(buildingSet).sort(),
            priorities: Array.from(prioritySet).sort((a,b) => ['Critical', 'High', 'Medium', 'Low', 'N/A'].indexOf(a) - ['Critical', 'High', 'Medium', 'Low', 'N/A'].indexOf(b)),
            statuses: Array.from(statusSet).sort(),
        };
    }, []);

    const filteredData = useMemo(() => {
        return hvacData.filter(item => {
            const searchLower = searchTerm.toLowerCase();
            const matchesSearch = searchTerm === '' || Object.values(item).some(val => String(val).toLowerCase().includes(searchLower));
            const matchesBuilding = selectedBuilding === 'all' || item.building === selectedBuilding;
            const matchesPriority = selectedPriority === 'all' || item.priority === selectedPriority;
            const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
            return matchesSearch && matchesBuilding && matchesPriority && matchesStatus;
        });
    }, [searchTerm, selectedBuilding, selectedPriority, selectedStatus]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        return filteredData.slice(startIndex, startIndex + rowsPerPage);
    }, [filteredData, currentPage, rowsPerPage]);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const summary = useMemo(() => ({
        total: hvacData.length,
        open: hvacData.filter(i => i.status !== 'Closed - Verified').length,
        critical: hvacData.filter(i => i.priority === 'Critical').length,
        awaitingLPO: hvacData.filter(i => i.status === 'Quote Submitted / Awaiting LPO').length,
    }), []);
    
    const resetFilters = () => {
        setSearchTerm('');
        setSelectedBuilding('all');
        setSelectedPriority('all');
        setSelectedStatus('all');
        setCurrentPage(1);
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <SummaryCard icon="total" title="Total Findings" value={summary.total} color="blue" />
                <SummaryCard icon="open" title="Open Issues" value={summary.open} color="orange" />
                <SummaryCard icon="critical" title="Critical Priority" value={summary.critical} color="red" />
                <SummaryCard icon="lpo" title="Awaiting LPO" value={summary.awaitingLPO} color="purple" />
            </div>

            <Card>
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4 flex-wrap">
                    <h3 className="text-xl font-bold w-full md:w-auto">HVAC System Maintenance Findings</h3>
                    <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Search issues..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            className="p-2 border rounded-lg w-full sm:w-48 bg-input text-foreground"
                        />
                        <select value={selectedBuilding} onChange={e => { setSelectedBuilding(e.target.value); setCurrentPage(1); }} className="p-2 border rounded-lg bg-input text-foreground w-full sm:w-auto">
                            <option value="all">All Buildings</option>
                            {buildings.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                        <select value={selectedPriority} onChange={e => { setSelectedPriority(e.target.value as any); setCurrentPage(1); }} className="p-2 border rounded-lg bg-input text-foreground w-full sm:w-auto">
                            <option value="all">All Priorities</option>
                             {priorities.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                         <select value={selectedStatus} onChange={e => { setSelectedStatus(e.target.value as any); setCurrentPage(1); }} className="p-2 border rounded-lg bg-input text-foreground w-full sm:w-auto">
                            <option value="all">All Statuses</option>
                             {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <button onClick={resetFilters} className="bg-secondary text-secondary-foreground font-semibold py-2 px-4 rounded-lg w-full sm:w-auto">Reset</button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full w-full bg-card">
                        <thead className="bg-secondary">
                            <tr>
                                {['ID', 'Building', 'Equipment', 'Finding', 'Qty', 'Priority', 'Status', 'Action Required'].map(header => (
                                     <th key={header} className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">{header}</th>
                                ))}
                                 <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Notes</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {paginatedData.map((item) => (
                                <tr key={item.id} className="hover:bg-secondary">
                                    <td className="py-3 px-4 whitespace-nowrap text-sm font-medium text-primary">{item.id}</td>
                                    <td className="py-3 px-4 whitespace-nowrap text-sm text-muted-foreground">{item.building}</td>
                                    <td className="py-3 px-4 whitespace-nowrap text-sm text-muted-foreground">{item.equipment}</td>
                                    <td className="py-3 px-4 text-sm text-foreground max-w-xs" style={{ whiteSpace: 'normal' }}>{item.finding}</td>
                                    <td className="py-3 px-4 whitespace-nowrap text-sm text-center text-muted-foreground">{item.qty}</td>
                                    <td className="py-3 px-4 whitespace-nowrap text-sm"><PriorityBadge priority={item.priority as Priority} /></td>
                                    <td className="py-3 px-4 whitespace-nowrap text-sm"><StatusBadge status={item.status as Status} /></td>
                                    <td className="py-3 px-4 text-sm text-foreground max-w-xs" style={{ whiteSpace: 'normal' }}>{item.actionRequired}</td>
                                    <td className="py-3 px-4 text-sm text-muted-foreground max-w-xs" style={{ whiteSpace: 'normal' }}>{item.notes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredData.length === 0 && (
                    <div className="text-center py-10 text-muted-foreground">
                        <p>No findings match your current filters.</p>
                    </div>
                )}
                <div className="flex justify-between items-center pt-4 flex-wrap gap-2">
                    <span className="text-sm text-muted-foreground">
                        Showing {Math.min((currentPage - 1) * rowsPerPage + 1, filteredData.length)} to {Math.min(currentPage * rowsPerPage, filteredData.length)} of {filteredData.length} findings
                    </span>
                    <div className="flex space-x-2">
                        <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1} className="bg-secondary text-secondary-foreground py-2 px-4 rounded-lg disabled:opacity-50">Previous</button>
                        <span className="p-2">Page {currentPage} of {totalPages}</span>
                        <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages} className="bg-primary text-primary-foreground py-2 px-4 rounded-lg disabled:opacity-50">Next</button>
                    </div>
                </div>
            </Card>
        </div>
    );
}