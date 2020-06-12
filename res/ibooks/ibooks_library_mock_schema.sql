CREATE TABLE ZBKLIBRARYASSET (
    Z_PK INTEGER PRIMARY KEY, 
    Z_ENT INTEGER, 
    Z_OPT INTEGER, 
    ZCANREDOWNLOAD INTEGER, 
    ZCOMPUTEDRATING INTEGER, 
    ZCONTENTTYPE INTEGER, 
    ZDESKTOPSUPPORTLEVEL INTEGER, 
    ZDIDRUNFORYOUENDOFBOOKEXPERIENCE INTEGER, 
    ZDIDWARNABOUTDESKTOPSUPPORT INTEGER, 
    ZFILESIZE INTEGER, 
    ZGENERATION INTEGER, 
    ZISDEVELOPMENT INTEGER, 
    ZISEPHEMERAL INTEGER, 
    ZISEXPLICIT INTEGER, 
    ZISFINISHED INTEGER, 
    ZISHIDDEN INTEGER, 
    ZISLOCKED INTEGER, 
    ZISNEW INTEGER, 
    ZISPROOF INTEGER, 
    ZISSAMPLE INTEGER, 
    ZISSTOREAUDIOBOOK INTEGER, 
    ZISTRACKEDASRECENT INTEGER, 
    ZMETADATAMIGRATIONVERSION INTEGER, 
    ZNOTFINISHED INTEGER, 
    ZPAGECOUNT INTEGER, 
    ZRATING INTEGER, 
    ZSERIESISCLOUDONLY INTEGER, 
    ZSERIESISHIDDEN INTEGER, 
    ZSERIESNEXTFLAG INTEGER, 
    ZSERIESSORTKEY INTEGER, 
    ZSORTKEY INTEGER, 
    ZSTATE INTEGER, 
    ZTASTE INTEGER, 
    ZTASTESYNCEDTOSTORE INTEGER, 
    ZLOCALONLYSERIESITEMSPARENT INTEGER, 
    ZPURCHASEDANDLOCALPARENT INTEGER, 
    ZSERIESCONTAINER INTEGER, 
    ZASSETDETAILSMODIFICATIONDATE TIMESTAMP, 
    ZBOOKHIGHWATERMARKPROGRESS FLOAT, 
    ZBOOKMARKSSERVERMAXMODIFICATIONDATE TIMESTAMP, 
    ZCREATIONDATE TIMESTAMP, 
    ZDATEFINISHED TIMESTAMP, 
    ZDURATION FLOAT, 
    ZEXPECTEDDATE TIMESTAMP, 
    ZFILEONDISKLASTTOUCHDATE TIMESTAMP, 
    ZLASTENGAGEDDATE TIMESTAMP, 
    ZLASTOPENDATE TIMESTAMP, 
    ZLOCATIONSERVERMAXMODIFICATIONDATE TIMESTAMP, 
    ZMODIFICATIONDATE TIMESTAMP, 
    ZPURCHASEDATE TIMESTAMP, 
    ZREADINGPROGRESS FLOAT, 
    ZRELEASEDATE TIMESTAMP, 
    ZUPDATEDATE TIMESTAMP, 
    ZVERSIONNUMBER FLOAT, 
    ZACCOUNTID VARCHAR, 
    ZASSETID VARCHAR,                                                  -- maps to source ID in ZAEANNOTATION
    ZAUTHOR VARCHAR, 
    ZBOOKDESCRIPTION VARCHAR, 
    ZBOOKMARKSSERVERVERSION VARCHAR, 
    ZCOMMENTS VARCHAR, 
    ZCOVERURL VARCHAR, 
    ZCOVERWRITINGMODE VARCHAR, 
    ZDATASOURCEIDENTIFIER VARCHAR, 
    ZDOWNLOADEDDSID VARCHAR, 
    ZEPUBID VARCHAR, 
    ZFAMILYID VARCHAR, 
    ZGENRE VARCHAR, 
    ZGROUPING VARCHAR, 
    ZKIND VARCHAR, 
    ZLANGUAGE VARCHAR, 
    ZLOCATIONSERVERVERSION VARCHAR, 
    ZPAGEPROGRESSIONDIRECTION VARCHAR, 
    ZPATH VARCHAR,                                                      -- path to the book
    ZPERMLINK VARCHAR, 
    ZPURCHASEDDSID VARCHAR, 
    ZSEQUENCEDISPLAYNAME VARCHAR, 
    ZSERIESID VARCHAR, 
    ZSORTAUTHOR VARCHAR, 
    ZSORTTITLE VARCHAR, 
    ZSTOREID VARCHAR, 
    ZTEMPORARYASSETID VARCHAR, 
    ZTITLE VARCHAR,                                                     -- title of a book
    ZVERSIONNUMBERHUMANREADABLE VARCHAR, 
    ZYEAR VARCHAR
);
CREATE INDEX ZBKLIBRARYASSET_ZLOCALONLYSERIESITEMSPARENT_INDEX ON ZBKLIBRARYASSET (ZLOCALONLYSERIESITEMSPARENT);
CREATE INDEX ZBKLIBRARYASSET_ZPURCHASEDANDLOCALPARENT_INDEX ON ZBKLIBRARYASSET (ZPURCHASEDANDLOCALPARENT);
CREATE INDEX ZBKLIBRARYASSET_ZSERIESCONTAINER_INDEX ON ZBKLIBRARYASSET (ZSERIESCONTAINER);
CREATE INDEX Z_BKLibraryAsset_assetID ON ZBKLIBRARYASSET (ZASSETID COLLATE BINARY ASC);
CREATE INDEX Z_BKLibraryAsset_bookHighWaterMarkProgress ON ZBKLIBRARYASSET (ZBOOKHIGHWATERMARKPROGRESS COLLATE BINARY ASC);
CREATE INDEX Z_BKLibraryAsset_seriesID ON ZBKLIBRARYASSET (ZSERIESID COLLATE BINARY ASC);
CREATE INDEX Z_BKLibraryAsset_seriesIsHidden ON ZBKLIBRARYASSET (ZSERIESISHIDDEN COLLATE BINARY ASC);
CREATE INDEX Z_BKLibraryAsset_seriesSortKey ON ZBKLIBRARYASSET (ZSERIESSORTKEY COLLATE BINARY ASC);