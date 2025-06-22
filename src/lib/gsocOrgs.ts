interface GSoCOrganization {
    id: number;
    organization: string;
    techStack: string[];
    githubRepo: string;
    openIssues: string;
  }
  
  const gsocOrganizations: GSoCOrganization[] = [
    { id: 1, organization: "Apache Software Foundation", techStack: ["Java", "Python", "C++", "JavaScript", "Scala"], githubRepo: "https://github.com/apache", openIssues: "15,000+" },
    { id: 2, organization: "KDE", techStack: ["C++", "Qt", "QML", "Python", "JavaScript"], githubRepo: "https://github.com/KDE", openIssues: "2,500+" },
    { id: 3, organization: "Mozilla", techStack: ["Rust", "C++", "JavaScript", "Python"], githubRepo: "https://github.com/mozilla", openIssues: "3,000+" },
    { id: 4, organization: "Jenkins", techStack: ["Java", "Groovy", "JavaScript", "Go"], githubRepo: "https://github.com/jenkinsci/jenkins", openIssues: "1,800+" },
    { id: 5, organization: "GNOME", techStack: ["C", "Python", "JavaScript", "Vala"], githubRepo: "https://github.com/GNOME", openIssues: "2,200+" },
    { id: 6, organization: "PostgreSQL", techStack: ["C", "SQL", "Python", "Perl"], githubRepo: "https://github.com/postgres/postgres", openIssues: "800+" },
    { id: 7, organization: "Blender Foundation", techStack: ["C++", "Python", "OpenGL"], githubRepo: "https://github.com/blender/blender", openIssues: "1,500+" },
    { id: 8, organization: "Django Software Foundation", techStack: ["Python", "JavaScript", "HTML/CSS"], githubRepo: "https://github.com/django/django", openIssues: "1,200+" },
    { id: 9, organization: "NumPy", techStack: ["Python", "C", "C++", "Cython"], githubRepo: "https://github.com/numpy/numpy", openIssues: "400+" },
    { id: 10, organization: "SciPy", techStack: ["Python", "C", "Fortran"], githubRepo: "https://github.com/scipy/scipy", openIssues: "600+" },
    { id: 11, organization: "Kubernetes", techStack: ["Go", "Shell", "Python"], githubRepo: "https://github.com/kubernetes/kubernetes", openIssues: "2,800+" },
    { id: 12, organization: "TensorFlow", techStack: ["Python", "C++", "JavaScript"], githubRepo: "https://github.com/tensorflow/tensorflow", openIssues: "2,100+" },
    { id: 13, organization: "OpenCV", techStack: ["C++", "Python", "Java"], githubRepo: "https://github.com/opencv/opencv", openIssues: "900+" },
    { id: 14, organization: "FreeBSD", techStack: ["C", "C++", "Shell"], githubRepo: "https://github.com/freebsd/freebsd-src", openIssues: "1,000+" },
    { id: 15, organization: "Debian", techStack: ["C", "Python", "Shell", "Perl"], githubRepo: "https://github.com/Debian", openIssues: "3,500+" },
    { id: 16, organization: "GitLab", techStack: ["Ruby", "Go", "Vue.js", "JavaScript"], githubRepo: "https://github.com/gitlabhq/gitlabhq", openIssues: "4,200+" },
    { id: 17, organization: "Zulip", techStack: ["Python", "JavaScript", "HTML/CSS"], githubRepo: "https://github.com/zulip/zulip", openIssues: "800+" },
    { id: 18, organization: "Red Hat", techStack: ["C", "Python", "Go", "Java"], githubRepo: "https://github.com/RedHatOfficial", openIssues: "1,500+" },
    { id: 19, organization: "CERN (ROOT)", techStack: ["C++", "Python", "ROOT"], githubRepo: "https://github.com/root-project/root", openIssues: "400+" },
    { id: 20, organization: "R Project", techStack: ["R", "C", "Fortran"], githubRepo: "https://github.com/r-devel/r-svn", openIssues: "300+" },
    {
        id: 21,
        organization: "Wikimedia Foundation",
        techStack: ["PHP", "JavaScript", "Python", "Java"],
        githubRepo: "https://github.com/wikimedia",
        openIssues: "2,000+"
      },
      {
        id: 22,
        organization: "CircuitVerse",
        techStack: ["Ruby on Rails", "JavaScript", "HTML/CSS"],
        githubRepo: "https://github.com/CircuitVerse/CircuitVerse",
        openIssues: "200+"
      },
      {
        id: 23,
        organization: "Godot Engine",
        techStack: ["C++", "C#", "GDScript", "Python"],
        githubRepo: "https://github.com/godotengine/godot",
        openIssues: "8,000+"
      },
      {
        id: 24,
        organization: "LibreOffice",
        techStack: ["C++", "Java", "Python", "JavaScript"],
        githubRepo: "https://github.com/LibreOffice/core",
        openIssues: "15,000+"
      },
      {
        id: 25,
        organization: "OpenMRS",
        techStack: ["Java", "JavaScript", "React", "Spring"],
        githubRepo: "https://github.com/openmrs",
        openIssues: "1,500+"
      },
      {
        id: 26,
        organization: "OWASP",
        techStack: ["Java", "Python", "JavaScript", "C#"],
        githubRepo: "https://github.com/OWASP",
        openIssues: "3,000+"
      },
      {
        id: 27,
        organization: "Processing Foundation",
        techStack: ["Java", "JavaScript", "Python"],
        githubRepo: "https://github.com/processing",
        openIssues: "800+"
      },
      {
        id: 28,
        organization: "Sugar Labs",
        techStack: ["Python", "JavaScript", "HTML/CSS"],
        githubRepo: "https://github.com/sugarlabs",
        openIssues: "1,200+"
      },
      {
        id: 29,
        organization: "Mifos Initiative",
        techStack: ["Java", "Angular", "Spring Boot", "MySQL"],
        githubRepo: "https://github.com/openMF",
        openIssues: "800+"
      },
      {
        id: 30,
        organization: "Internet Archive",
        techStack: ["Python", "JavaScript", "PHP", "Java"],
        githubRepo: "https://github.com/internetarchive",
        openIssues: "500+"
      },
      {
        id: 31,
        organization: "Submitty",
        techStack: ["PHP", "Python", "JavaScript", "C++"],
        githubRepo: "https://github.com/Submitty/Submitty",
        openIssues: "600+"
      },
      {
        id: 32,
        organization: "51Degrees",
        techStack: ["C", "Java", "Python", "C#"],
        githubRepo: "https://github.com/51Degrees",
        openIssues: "100+"
      },
      {
        id: 33,
        organization: "ArduPilot",
        techStack: ["C++", "Python", "Lua"],
        githubRepo: "https://github.com/ArduPilot/ardupilot",
        openIssues: "1,000+"
      },
      {
        id: 34,
        organization: "Scilab",
        techStack: ["C", "Java", "Scilab"],
        githubRepo: "https://github.com/scilab/scilab",
        openIssues: "400+"
      },
      {
        id: 35,
        organization: "Sustainable Computing Research Group",
        techStack: ["Go", "Python", "JavaScript"],
        githubRepo: "https://github.com/sustainable-computing-io",
        openIssues: "200+"
      },
      {
        id: 36,
        organization: "VideoLAN",
        techStack: ["C", "C++", "Objective-C", "Java"],
        githubRepo: "https://github.com/videolan",
        openIssues: "2,000+"
      },
      {
        id: 37,
        organization: "Systers Community",
        techStack: ["Python", "Java", "Swift", "Kotlin"],
        githubRepo: "https://github.com/systers",
        openIssues: "300+"
      },
      {
        id: 38,
        organization: "OpenWISP",
        techStack: ["Python", "JavaScript", "Django"],
        githubRepo: "https://github.com/openwisp",
        openIssues: "400+"
      },
      {
        id: 39,
        organization: "Matrix.org",
        techStack: ["Python", "JavaScript", "Rust", "Go"],
        githubRepo: "https://github.com/matrix-org",
        openIssues: "3,500+"
      },
      {
        id: 40,
        organization: "Anita Borg Institute",
        techStack: ["Python", "JavaScript", "React", "Django"],
        githubRepo: "https://github.com/anitab-org",
        openIssues: "500+"
      },
      {
        id: 41,
        organization: "Public Lab",
        techStack: ["Ruby on Rails", "JavaScript", "HTML/CSS"],
        githubRepo: "https://github.com/publiclab",
        openIssues: "1,800+"
      },
      {
        id: 42,
        organization: "Beam Community",
        techStack: ["Erlang", "Elixir", "C"],
        githubRepo: "https://github.com/erlang",
        openIssues: "600+"
      },
      {
        id: 43,
        organization: "CCExtractor Development",
        techStack: ["C", "Python", "JavaScript"],
        githubRepo: "https://github.com/CCExtractor/ccextractor",
        openIssues: "200+"
      },
      {
        id: 44,
        organization: "Open Astronomy",
        techStack: ["Python", "C", "JavaScript"],
        githubRepo: "https://github.com/OpenAstronomy",
        openIssues: "800+"
      },
      {
        id: 45,
        organization: "AboutCode",
        techStack: ["Python", "JavaScript", "React"],
        githubRepo: "https://github.com/nexB",
        openIssues: "300+"
      },
      {
        id: 46,
        organization: "Casbin",
        techStack: ["Go", "Java", "Python", "JavaScript"],
        githubRepo: "https://github.com/casbin",
        openIssues: "400+"
      },
      {
        id: 47,
        organization: "mlpack",
        techStack: ["C++", "Python", "Julia"],
        githubRepo: "https://github.com/mlpack/mlpack",
        openIssues: "200+"
      },
      {
        id: 48,
        organization: "OpenImageIO",
        techStack: ["C++", "Python"],
        githubRepo: "https://github.com/OpenImageIO/oiio",
        openIssues: "300+"
      },
      {
        id: 49,
        organization: "FOSDEM",
        techStack: ["Ruby", "JavaScript", "HTML/CSS"],
        githubRepo: "https://github.com/FOSDEM",
        openIssues: "50+"
      },
      {
        id: 50,
        organization: "International Neuroinformatics Coordinating Facility",
        techStack: ["Python", "R", "MATLAB", "JavaScript"],
        githubRepo: "https://github.com/INCF",
        openIssues: "150+"
      }
  ];
  
  export default gsocOrganizations;