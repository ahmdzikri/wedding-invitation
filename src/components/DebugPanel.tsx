"use client";
import { useState } from 'react';
import { Button } from './ui/button';

// Temporary debug component to help diagnose API issues
export default function DebugPanel() {
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  const testAPI = async () => {
    setDebugInfo('Testing API...');
    
    try {
      // Test GET endpoint
      const getResponse = await fetch('/api/greetings');
      const getData = await getResponse.json();
      
      let info = `GET /api/greetings:\nStatus: ${getResponse.status}\nResponse: ${JSON.stringify(getData, null, 2)}\n\n`;
      
      // Test POST endpoint
      const postResponse = await fetch('/api/greetings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Debug Test',
          message: 'This is a debug test message'
        }),
      });
      
      const postData = await postResponse.json();
      info += `POST /api/greetings:\nStatus: ${postResponse.status}\nResponse: ${JSON.stringify(postData, null, 2)}`;
      
      setDebugInfo(info);
    } catch (error) {
      setDebugInfo(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const checkEnvVars = async () => {
    try {
      const response = await fetch('/api/greetings/debug', {
        method: 'GET',
      });
      const data = await response.json();
      setDebugInfo(`Environment Check:\n${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      setDebugInfo(`Env check failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button 
          onClick={() => setIsVisible(true)}
          className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1"
        >
          Debug
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-md max-h-96 overflow-auto">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-sm">Debug Panel</h3>
        <Button 
          onClick={() => setIsVisible(false)}
          className="text-xs px-2 py-1 h-auto"
          variant="outline"
        >
          ×
        </Button>
      </div>
      
      <div className="space-y-2 mb-3">
        <Button 
          onClick={testAPI}
          className="text-xs px-2 py-1 h-auto w-full"
          size="sm"
        >
          Test API
        </Button>
        <Button 
          onClick={checkEnvVars}
          className="text-xs px-2 py-1 h-auto w-full"
          size="sm"
          variant="outline"
        >
          Check Env
        </Button>
      </div>
      
      {debugInfo && (
        <div className="bg-gray-100 p-2 rounded text-xs font-mono whitespace-pre-wrap max-h-48 overflow-auto">
          {debugInfo}
        </div>
      )}
    </div>
  );
}