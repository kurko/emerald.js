abort "Please use Ruby 1.9 to build Emerald.js!" if RUBY_VERSION !~ /^1\.9/

require "bundler/setup"

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

task :default => :test
