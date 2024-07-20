export const kelvinToCelsius = (kelvin: number): number => {
    return Math.round(kelvin - 273.15);
  };
  
  export const kelvinToFahrenheit = (kelvin: number): number => {
    return Math.round((kelvin - 273.15) * 9/5 + 32);
  };
  
  export const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  export const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };