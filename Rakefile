abort "Please use Ruby 1.9 to build Emerald.js!" if RUBY_VERSION !~ /^1\.9/

require "bundler/setup"
require "uglifier"

desc "Run tests with phantomjs"
task :test do |t, args|
  require "colored"

  unless system("which phantomjs > /dev/null 2>&1")
    abort "PhantomJS is not installed. Download from http://phantomjs.org"
  end

  success = true
  opt = ""

  cmd = "phantomjs tests/run-qunit.js \"file://localhost#{File.dirname(__FILE__)}/tests/index.html?#{opt}\""
  system(cmd)

  success &&= $?.success?

  if success
    puts "\nTests Passed".green
  else
    puts "\nTests Failed".red
    exit(1)
  end
end

def build_packages(build_type = :stable)
  require "colored"

  build_filepaths = {
    stable:          "build/stable.js",
    stable_minified: "build/stable.min.js",
    head:            "build/head.unstable.js"
  }

  build_filepath = build_filepaths[build_type]
  packages = %w(core action_view action_controller active_model active_persistence)
  puts "Building #{build_type.to_s.yellow} packages..."
  puts ""
  puts "#{packages.map { |p| p.yellow }.join(", ")}"

  # creates a list of all code files, putting first the file named after the
  # package, e.g in the 'core' package, 'core.js' will come before than 'array.js'
  files = []
  packages.each do |package|
    package_dir = "#{package}/lib"
    files << "#{package_dir}/#{package}.js"
    Dir["#{package_dir}/**/*"].each do |package_file|
      files << package_file unless files.include?(package_file)
    end
  end

  stable_path = File.expand_path("../#{build_filepath}", __FILE__)
  stable_file = File.new(stable_path, "w")
  code_string = []

  files.each do |file_path|
    file_path = File.expand_path("../#{file_path}", __FILE__)
    file = File.new(file_path, "r")
    code_string << file.read
    file.close
  end

  stable_file << code_string.join("\n")
  puts ""
  puts "Build complete in #{build_filepath}!".green
  puts ""

  stable_file.close

  normal_file_size = File.size(build_filepath)
  if normal_file_size > 1024
    normal_file_size = (normal_file_size / 1024.0).to_s[/.*\.[0-9]{0,2}/] + "Kb"
  end

  if build_type != :stable
    puts "File size: " + normal_file_size.to_s
  else
    # Compiles the build
    minified_path = build_filepaths[:stable_minified]
    compiled = Uglifier.compile(File.read(build_filepath))
    File.write(minified_path, compiled)

    minified_file_size = File.size(File.open(minified_path).path)
    if minified_file_size > 1024
      minified_file_size = (minified_file_size / 1024.0).to_s[/.*\.[0-9]{0,2}/] + "Kb"
    else
      minified_file_size = "#{minified_file_size} bytes"
    end

    puts "Normal file size: " + normal_file_size.to_s
    puts "Minified file size: " + minified_file_size
  end
end

desc "Build the stable version based off the current code files"
task :build do
  build_packages(:stable)
end

desc "Build the project with a unstable status"
task :build_head do
  build_packages(:head)
end

task :default => :test
