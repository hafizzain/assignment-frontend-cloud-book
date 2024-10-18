// Function to format issue_type
export const formatIssueType = (issueType) => {
    return issueType
      ?.replace(/_/g, ' ') // Replace underscores with spaces
      ?.replace(/^./, (char) => char?.toUpperCase()); // Capitalize the first character
  };