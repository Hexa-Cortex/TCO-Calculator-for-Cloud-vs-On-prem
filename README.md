# Cloud vs On-Premises TCO Calculator

A comprehensive Total Cost of Ownership (TCO) calculator to compare cloud infrastructure costs against on-premises deployment over time.

![TCO Calculator](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🌟 Features

- **Interactive Cost Analysis**: Real-time TCO calculations as you adjust parameters
- **Flexible Timeframe**: Analyze costs from 1 to 10 years
- **Comprehensive Cost Factors**:
  - On-Premises: CapEx (servers, storage, network) + OpEx (power, cooling, staff, maintenance)
  - Cloud: Compute, storage, network, backup, security, support, data transfer
- **Visual Comparison**: Side-by-side cost breakdown with savings analysis
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Pre-populated Defaults**: Industry-standard values for quick analysis

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ and npm
- Modern web browser

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/tco-calculator.git

# Navigate to project directory
cd tco-calculator

# Install dependencies
npm install

# Start development server
npm run dev
```

The calculator will be available at `http://localhost:5173`

## 📊 Usage

1. **Set Timeframe**: Use the slider to select analysis period (1-10 years)
2. **Configure On-Premises Costs**:
   - Enter number of servers and cost per server
   - Specify storage capacity and cost
   - Add network equipment costs
   - Include operating expenses (power, cooling, facility, staff)
3. **Configure Cloud Costs**:
   - Enter monthly costs for each service category
   - Include compute, storage, network, backup, security, support
4. **View Results**: Compare total TCO, see cost breakdown, and identify savings

## 🏗️ Project Structure

```
tco-calculator/
├── src/
│   ├── App.jsx           # Main React component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── public/
├── docs/
│   ├── USAGE.md          # Detailed usage guide
│   └── METHODOLOGY.md    # TCO calculation methodology
├── package.json
├── vite.config.js
├── README.md
└── LICENSE
```

## 💡 Example Scenarios

### Small Business (10 servers)
- **On-Premises**: ~$250,000 over 5 years
- **Cloud**: ~$180,000 over 5 years
- **Savings**: 28% with cloud

### Enterprise (100 servers)
- **On-Premises**: ~$2,000,000 over 5 years
- **Cloud**: ~$1,800,000 over 5 years
- **Savings**: 10% with cloud

## 📈 Cost Factors Explained

### On-Premises
- **Capital Expenses**: Hardware purchase (servers, storage, network equipment)
- **Operating Expenses**: Power, cooling, facility space, IT staff, maintenance, licenses

### Cloud
- **Operating Expenses Only**: Pay-as-you-go model with no upfront CapEx
- Includes: Compute instances, storage, networking, security, support, data transfer

## 🛠️ Technology Stack

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icon library

## 📝 Customization

The calculator uses realistic default values but can be customized for any scenario:

- Modify default values in the `useState` hooks
- Add new cost factors by extending the state objects
- Customize calculation logic in `calculateOnPremTCO` and `calculateCloudTCO`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Based on industry-standard TCO calculation methodologies
- Inspired by various cloud provider TCO calculators
- Built with modern React best practices

## 📧 Contact

Project Link: [https://github.com/yourusername/tco-calculator](https://github.com/yourusername/tco-calculator)

---

Made with ❤️ for better infrastructure decisions
