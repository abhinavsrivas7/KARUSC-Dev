using Karusc.Server;

WebApplication
    .CreateBuilder(args)
    .SetupKarusc()
    .Build()
    .InstallKarusc()
    .Run();