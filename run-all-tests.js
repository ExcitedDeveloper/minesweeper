#!/usr/bin/env node

/**
 * Script to run all tests in groups to avoid memory issues
 * Usage: node run-all-tests.js
 */

import { execSync } from 'child_process';

const testGroups = [
  {
    name: 'Core Logic & Types',
    command: 'npx vitest --run src/engine src/util src/constants.test.ts src/types',
  },
  {
    name: 'State Management & Hooks',
    command: 'npx vitest --run src/store src/hooks',
  },
  {
    name: 'React Components',
    command: 'npx vitest --run src/components src/App.test.tsx',
  }
];

let totalTests = 0;
let totalPassed = 0;
let totalFailed = 0;
let allResults = [];

console.log('🧪 Running Minesweeper Test Suite in Groups\n');

for (const group of testGroups) {
  console.log(`📋 Running: ${group.name}`);
  console.log(`⚡ Command: ${group.command}\n`);
  
  try {
    const output = execSync(group.command, { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    
    // Parse output for test results
    const passedMatch = output.match(/(\d+) passed/);
    const failedMatch = output.match(/(\d+) failed/);
    
    const passed = passedMatch ? parseInt(passedMatch[1]) : 0;
    const failed = failedMatch ? parseInt(failedMatch[1]) : 0;
    const tests = passed + failed;
    
    totalTests += tests;
    totalPassed += passed;
    totalFailed += failed;
    
    allResults.push({
      group: group.name,
      tests,
      passed,
      failed,
      status: '✅ PASSED'
    });
    
    console.log(`✅ ${group.name}: ${passed} passed, ${failed} failed\n`);
    
  } catch (error) {
    console.log(`❌ ${group.name}: FAILED\n`);
    console.log(error.stdout || error.message);
    
    allResults.push({
      group: group.name,
      tests: 0,
      passed: 0,
      failed: 0,
      status: '❌ FAILED'
    });
  }
}

// Print summary
console.log('📊 TEST SUITE SUMMARY');
console.log('='.repeat(50));

allResults.forEach(result => {
  console.log(`${result.status} ${result.group}: ${result.passed}/${result.tests} tests passed`);
});

console.log('='.repeat(50));
console.log(`🎯 TOTAL: ${totalPassed}/${totalTests} tests passed`);

if (totalFailed === 0) {
  console.log('🎉 All tests passed successfully!');
  process.exit(0);
} else {
  console.log(`⚠️  ${totalFailed} tests failed`);
  process.exit(1);
}