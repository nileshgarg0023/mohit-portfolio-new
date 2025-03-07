import { BlogPost, Project, Testimonial } from '@/lib/supabase'

export const sampleExperiences = [
  {
    id: 1,
    title: "Senior Security Engineer",
    company: "CyberShield Systems",
    location: "San Francisco, CA",
    start_date: "2022-01",
    end_date: "Present",
    description: "Leading the development of advanced security solutions for enterprise clients. Implemented zero-trust architecture and automated security testing pipelines.",
    technologies: ["Zero Trust", "DevSecOps", "Kubernetes", "AWS"],
    created_at: "2024-03-15T10:30:00Z"
  },
  {
    id: 2,
    title: "Security Consultant",
    company: "SecureTech Solutions",
    location: "New York, NY",
    start_date: "2020-06",
    end_date: "2021-12",
    description: "Provided security consulting services to Fortune 500 companies. Developed custom security frameworks and conducted penetration testing.",
    technologies: ["Penetration Testing", "Security Auditing", "Risk Assessment", "Compliance"],
    created_at: "2024-03-14T15:45:00Z"
  },
  {
    id: 3,
    title: "Security Analyst",
    company: "Defense Systems Inc.",
    location: "Washington, DC",
    start_date: "2018-03",
    end_date: "2020-05",
    description: "Monitored and analyzed security threats, implemented SIEM solutions, and developed incident response procedures.",
    technologies: ["SIEM", "Threat Intelligence", "Incident Response", "Log Analysis"],
    created_at: "2024-03-13T09:15:00Z"
  }
]

export const sampleProjects: Project[] = [
  {
    id: "1",
    title: "Automotive IDS/IPS System",
    description: "Developed an advanced Intrusion Detection and Prevention System specifically designed for modern vehicle networks. Utilizes machine learning for real-time threat detection and automated response.",
    image_url: "https://images.unsplash.com/photo-1607825125043-c6fe96bf600a?q=80&w=1200",
    github_url: "https://github.com/yourusername/auto-ids",
    demo_url: "https://auto-ids-demo.vercel.app",
    tags: ["CAN Bus", "Machine Learning", "Cybersecurity", "Python", "TensorFlow"],
    created_at: "2024-01-15T00:00:00Z"
  },
  {
    id: "2",
    title: "V2X Security Framework",
    description: "A comprehensive security framework for Vehicle-to-Everything (V2X) communications. Implements PKI infrastructure, certificate management, and secure message protocols.",
    image_url: "https://images.unsplash.com/photo-1617427874595-936baba65185?q=80&w=1200",
    github_url: "https://github.com/yourusername/v2x-security",
    demo_url: "https://v2x-security.vercel.app",
    tags: ["V2X", "PKI", "Cryptography", "Go", "Protocol Buffers"],
    created_at: "2024-02-01T00:00:00Z"
  },
  {
    id: "3",
    title: "OTA Update Security Suite",
    description: "End-to-end security solution for Over-The-Air updates in connected vehicles. Features blockchain-based integrity verification and secure bootloader implementation.",
    image_url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200",
    github_url: "https://github.com/yourusername/ota-security",
    demo_url: "https://ota-security.vercel.app",
    tags: ["Blockchain", "Embedded", "Security", "Rust", "Solidity"],
    created_at: "2024-02-15T00:00:00Z"
  },
  {
    id: "4",
    title: "Vehicle SOC Dashboard",
    description: "Security Operations Center dashboard for fleet-wide vehicle security monitoring. Real-time threat visualization and incident response management.",
    image_url: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1200",
    github_url: "https://github.com/yourusername/vehicle-soc",
    demo_url: "https://vehicle-soc.vercel.app",
    tags: ["React", "TypeScript", "D3.js", "Security", "Dashboard"],
    created_at: "2024-03-01T00:00:00Z"
  }
]

export const sampleTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    role: "Chief Security Officer, AutoTech Solutions",
    message: "An exceptional cybersecurity expert who transformed our vehicle security infrastructure. The implementation of the IDS/IPS system significantly enhanced our threat detection capabilities.",
    image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400",
    created_at: "2024-02-20T00:00:00Z"
  },
  {
    id: "2",
    name: "James Rodriguez",
    role: "Lead Engineer, Connected Mobility Inc",
    message: "The V2X security framework developed has become the cornerstone of our connected vehicle platform. Outstanding attention to detail and security best practices.",
    image_url: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=400",
    created_at: "2024-02-21T00:00:00Z"
  },
  {
    id: "3",
    name: "Emma Thompson",
    role: "Director of Innovation, Future Vehicles",
    message: "Revolutionized our OTA update process with blockchain integration. The solution provides unprecedented security and transparency in our software deployment pipeline.",
    image_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400",
    created_at: "2024-02-22T00:00:00Z"
  },
  {
    id: "4",
    name: "Michael Chang",
    role: "Security Architect, SmartCar Technologies",
    message: "The SOC dashboard implementation has dramatically improved our incident response time. The intuitive interface and real-time analytics are exactly what we needed.",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
    created_at: "2024-02-23T00:00:00Z"
  }
]

export const sampleBlogs: BlogPost[] = [
  {
    id: "1",
    title: "Securing the Modern Vehicle Network: A Deep Dive into Automotive Cybersecurity",
    content: `# Understanding Vehicle Network Security

Modern vehicles are essentially computers on wheels, with dozens of Electronic Control Units (ECUs) communicating over complex internal networks. This article explores the critical aspects of securing these networks.

## The CAN Bus Challenge

The Controller Area Network (CAN bus) remains the backbone of vehicle communications, but it was designed for reliability, not security. Here's what makes it vulnerable:

\`\`\`python
# Example of a CAN message injection attack
def inject_malicious_message(bus):
    msg = can.Message(
        arbitration_id=0x7DF,  # OBD-II diagnostic ID
        data=[0x02, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
        extended_id=False
    )
    bus.send(msg)
\`\`\`

## Defense in Depth Strategy

1. **Message Authentication**
   - Implement secure message authentication codes (MACs)
   - Use hardware security modules (HSM) for key storage

2. **Network Segmentation**
   - Separate critical and non-critical networks
   - Implement secure gateways between domains

3. **Intrusion Detection**
   - Monitor for anomalous messages
   - Implement behavioral analysis

## Implementation Example

Here's a simple IDS rule implementation:

\`\`\`python
class CANIDSRule:
    def __init__(self, message_id, allowed_frequency):
        self.message_id = message_id
        self.allowed_frequency = allowed_frequency
        self.last_seen = 0
        self.violation_count = 0

    def check_message(self, message, timestamp):
        if message.arbitration_id == self.message_id:
            frequency = timestamp - self.last_seen
            if frequency < self.allowed_frequency:
                self.violation_count += 1
                return False
            self.last_seen = timestamp
        return True
\`\`\`

## Future Considerations

The shift towards connected and autonomous vehicles introduces new attack surfaces. Future security solutions must consider:

- V2X Communications
- Over-the-Air Updates
- AI/ML-based Attack Detection
- Zero Trust Architecture

Remember: Security in automotive networks is not optional - it's a critical safety requirement.`,
    excerpt: "Explore the complexities of modern vehicle network security, from CAN bus vulnerabilities to advanced intrusion detection systems. Learn about practical defense strategies and future security considerations.",
    image_url: "https://images.unsplash.com/photo-1618846042125-0a64d7e4c4c8?q=80&w=1200",
    tags: ["Automotive Security", "CAN Bus", "IDS", "Network Security"],
    created_at: "2024-03-10T00:00:00Z"
  },
  {
    id: "2",
    title: "Implementing Zero Trust Architecture in Connected Vehicles",
    content: `# Zero Trust in Automotive: Never Trust, Always Verify

The traditional perimeter-based security model is obsolete in modern connected vehicles. Zero Trust Architecture (ZTA) provides a more robust security approach.

## Core Principles of Automotive Zero Trust

1. **Verify Every Request**
2. **Use Least-Privilege Access**
3. **Assume Breach**
4. **Implement Micro-Segmentation**

## Practical Implementation

### Identity and Access Management

\`\`\`typescript
interface VehicleComponent {
  id: string;
  type: ComponentType;
  certificateChain: X509Certificate[];
  permissions: Permission[];
}

class ZeroTrustController {
  private async validateRequest(
    component: VehicleComponent,
    request: AccessRequest
  ): Promise<boolean> {
    // Verify component identity
    if (!await this.verifyCertificateChain(component.certificateChain)) {
      return false;
    }

    // Check permissions
    if (!this.checkPermissions(component, request)) {
      return false;
    }

    // Verify request context
    if (!this.validateContext(request)) {
      return false;
    }

    return true;
  }
}
\`\`\`

## Network Micro-segmentation

Example policy configuration:

\`\`\`yaml
network_segments:
  safety_critical:
    - brake_control
    - steering_control
    - airbag_system
  infotainment:
    - media_player
    - navigation
    - climate_control

access_policies:
  safety_critical:
    allowed_protocols: ["SOME/IP", "DDS"]
    encryption: "required"
    authentication: "mutual_tls"
  infotainment:
    allowed_protocols: ["TCP/IP", "HTTP/2"]
    encryption: "optional"
    authentication: "token_based"
\`\`\`

## Continuous Monitoring

Implement comprehensive logging and monitoring:

\`\`\`typescript
interface SecurityEvent {
  timestamp: number;
  componentId: string;
  eventType: SecurityEventType;
  severity: SecuritySeverity;
  details: Record<string, unknown>;
}

class SecurityMonitor {
  async logSecurityEvent(event: SecurityEvent): Promise<void> {
    // Log to secure storage
    await this.secureLogger.log(event);

    // Check for anomalies
    if (await this.anomalyDetector.analyze(event)) {
      await this.triggerAlert(event);
    }

    // Update risk score
    await this.riskEngine.updateScore(event.componentId, event);
  }
}
\`\`\`

## Best Practices

1. **Component Authentication**
   - Use strong mutual authentication
   - Implement certificate rotation
   - Maintain secure boot chain

2. **Communication Security**
   - Encrypt all internal communication
   - Use secure protocols
   - Implement message authentication

3. **Continuous Verification**
   - Monitor component behavior
   - Implement health checks
   - Use dynamic access policies

## Challenges and Solutions

| Challenge | Solution |
|-----------|----------|
| Resource Constraints | Optimize security algorithms |
| Latency Requirements | Use hardware acceleration |
| Legacy Integration | Implement secure gateways |

Remember: Zero Trust is not a single product but a comprehensive security strategy that requires careful planning and implementation.`,
    excerpt: "Learn how to implement Zero Trust Architecture in connected vehicles, covering identity management, micro-segmentation, and continuous monitoring with practical code examples.",
    image_url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1200",
    tags: ["Zero Trust", "Authentication", "Security Architecture", "Connected Vehicles"],
    created_at: "2024-03-15T00:00:00Z"
  },
  {
    id: "3",
    title: "Blockchain-Based Security for Vehicle Software Updates",
    content: `# Securing OTA Updates with Blockchain Technology

Over-the-Air (OTA) updates are crucial for modern vehicles but present significant security challenges. Blockchain technology offers a robust solution for securing the update process.

## Understanding the Architecture

### Smart Contract for Update Verification

\`\`\`solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VehicleUpdateVerification {
    struct Update {
        bytes32 updateHash;
        uint256 version;
        uint256 timestamp;
        address manufacturer;
        bool verified;
    }

    mapping(bytes32 => Update) public updates;
    mapping(address => bool) public authorizedManufacturers;

    event UpdateRegistered(
        bytes32 indexed updateHash,
        uint256 version,
        address manufacturer
    );

    modifier onlyAuthorizedManufacturer() {
        require(
            authorizedManufacturers[msg.sender],
            "Not authorized manufacturer"
        );
        _;
    }

    function registerUpdate(
        bytes32 _updateHash,
        uint256 _version
    ) external onlyAuthorizedManufacturer {
        updates[_updateHash] = Update({
            updateHash: _updateHash,
            version: _version,
            timestamp: block.timestamp,
            manufacturer: msg.sender,
            verified: true
        });

        emit UpdateRegistered(_updateHash, _version, msg.sender);
    }
}
\`\`\`

## Secure Update Process

### 1. Update Preparation

\`\`\`typescript
interface UpdatePackage {
  version: string;
  targetECUs: string[];
  payload: Buffer;
  signature: Buffer;
  metadata: UpdateMetadata;
}

class UpdateManager {
  private async prepareUpdate(
    update: UpdatePackage
  ): Promise<string> {
    // Generate update hash
    const updateHash = await this.generateUpdateHash(update);

    // Sign update with manufacturer's key
    const signature = await this.signUpdate(updateHash);

    // Register on blockchain
    await this.registerOnBlockchain(updateHash, signature);

    return updateHash;
  }
}
\`\`\`

### 2. Verification Process

\`\`\`typescript
class UpdateVerifier {
  async verifyUpdate(
    updateHash: string,
    signature: Buffer
  ): Promise<boolean> {
    // Verify blockchain registration
    const blockchainVerified = await this.verifyOnChain(updateHash);
    if (!blockchainVerified) return false;

    // Verify manufacturer signature
    const signatureValid = await this.verifySignature(
      updateHash,
      signature
    );
    if (!signatureValid) return false;

    // Verify update integrity
    return await this.verifyIntegrity(updateHash);
  }
}
\`\`\`

## Security Features

1. **Immutable Update History**
   - All updates are permanently recorded
   - Version tracking prevents rollback attacks
   - Audit trail for compliance

2. **Distributed Verification**
   - Multiple nodes verify update authenticity
   - Consensus prevents unauthorized updates
   - Transparent verification process

3. **Smart Contract Security**
   - Role-based access control
   - Update validation rules
   - Automated compliance checks

## Implementation Guidelines

### Secure Bootloader Integration

\`\`\`rust
#[derive(Debug)]
struct SecureBootloader {
    current_version: String,
    trusted_keys: Vec<PublicKey>,
    blockchain_client: BlockchainClient,
}

impl SecureBootloader {
    async fn verify_and_apply_update(
        &mut self,
        update: UpdatePackage
    ) -> Result<(), UpdateError> {
        // Verify blockchain record
        self.blockchain_client
            .verify_update(&update.hash)
            .await?;

        // Verify signatures
        self.verify_signatures(&update)?;

        // Apply update
        self.apply_update(update).await?;

        Ok(())
    }
}
\`\`\`

## Best Practices

1. **Key Management**
   - Use Hardware Security Modules (HSM)
   - Implement key rotation
   - Secure key distribution

2. **Network Security**
   - Secure update delivery
   - Bandwidth optimization
   - Failure recovery

3. **Compliance**
   - UNECE WP.29 compliance
   - ISO/SAE 21434 alignment
   - Regional regulations

Remember: Blockchain is not a silver bullet - it's part of a comprehensive security strategy for OTA updates.`,
    excerpt: "Discover how blockchain technology can enhance the security of vehicle software updates, featuring smart contracts, verification processes, and secure bootloader implementation.",
    image_url: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1200",
    tags: ["Blockchain", "OTA Updates", "Smart Contracts", "Automotive Security"],
    created_at: "2024-03-20T00:00:00Z"
  }
]

export const sampleMessages = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    subject: "Project Collaboration",
    message: "I'm impressed with your portfolio and would like to discuss a potential collaboration on a cybersecurity project.",
    created_at: "2024-03-15T10:30:00Z"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "Speaking Engagement",
    message: "We're organizing a cybersecurity conference and would love to have you as a speaker. Your expertise in automotive security would be valuable.",
    created_at: "2024-03-14T15:45:00Z"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    subject: "Consulting Opportunity",
    message: "Our company is looking for a security consultant to help implement a zero-trust architecture. Your experience matches our needs perfectly.",
    created_at: "2024-03-13T09:15:00Z"
  }
] 