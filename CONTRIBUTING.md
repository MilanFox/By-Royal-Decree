# Contributions

Thank you for your interest in contributing to *By Royal Decree*! While this is currently a private learning project, contributions are welcome, especially in the form of new levels. Below are the guidelines and processes for contributing to the project.

---

## Contribution Guidelines

### General Guidelines
1. **Opinionated Code Style**:
   This project uses strict ESLint and Stylelint configurations. Please ensure your code adheres to these rules before submitting.
2. **Commit Messages**:
   Conventional commit messages are enforced using Commitlint. Follow the [Conventional Commits Specification](https://www.conventionalcommits.org/).
3. **Git History**:
   During the initial build phase, a straight git history is maintained. Only squash merges and rebase merges are allowed.

### Technical Requirements
1. **Pull Requests**:
   All contributions must be made via pull requests to the protected `main` branch.
2. **Verified Commits**:
   Contributors must have verified GitHub accounts and set up SSH keys for pushing commits.
3. **Pipelines**:
   Pull requests will only be accepted if they pass all CI pipelines:
   - Deployment readiness checks.
   - TypeScript error checks.
   - ESLint/Stylelint error checks.

### Merge Process
1. **Approval**:
   All merge requests must be approved by a project maintainer.
2. **Restrictions**:
   Merges are restricted until approval and pipeline checks are complete.

---

## Level Contributions

At this stage, the most useful contributions are **new levels**. Levels are located in the `src/lib/levels/data` directory and follow a naming convention like `level_01.js`. To add a level:
1. **Follow the Existing Pattern**:
   Review the structure and logic of existing levels and use them as templates.
2. **Future Documentation**:
   While detailed documentation is pending, the current level files should provide sufficient guidance.

---

## Future Plans

After the first release, the contribution process will expand to include:
- Detailed "How to Contribute" documentation.
- A branching strategy for release versions.

Thank you for your patience and interest as this project evolves!
