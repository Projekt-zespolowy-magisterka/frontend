import React, { useState } from 'react';
import mockSettings from '../utils/mockSettings.js';

const SettingsPanel = () => {
    const [settings, setSettings] = useState(mockSettings);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        console.log("Settings saved:", settings);
    };

    return (
        <div className="mt-4">
            <h2>Application Settings</h2>
            <form>
                <div className="mb-3">
                    <label>Allow Notifications:</label>
                    <input
                        type="checkbox"
                        checked={settings.allowNotifications}
                        onChange={(e) => handleChange({ target: { name: "allowNotifications", value: e.target.checked } })}
                    />
                </div>
                <div className="mb-3">
                    <label>Refresh Interval (minutes):</label>
                    <input
                        type="number"
                        value={settings.refreshInterval}
                        onChange={(e) => handleChange({ target: { name: "refreshInterval", value: e.target.value } })}
                    />
                </div>
                <button type="button" onClick={handleSave} className="btn btn-primary">
                    Save Settings
                </button>
            </form>
        </div>
    );
};

export default SettingsPanel;
